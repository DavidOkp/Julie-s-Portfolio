import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

async function test() {
  const chrome = spawn('google-chrome', [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9223',
    '--user-data-dir=/tmp/cdp-test-profile-check',
    '--window-size=1440,900',
    'http://localhost:5173/expertise'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const res = await fetch('http://127.0.0.1:9223/json');
  const targets = await res.json();
  const page = targets.find(t => t.type === 'page' && t.url.includes('5173'));
  if (!page) {
    console.error('Page target not found');
    chrome.kill();
    process.exit(1);
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }
  await new Promise(r => ws.onopen = r);
  await send('Page.enable');
  await send('Runtime.enable');

  const errors = [];
  ws.onmessage = (e) => {
    const d = JSON.parse(e.data);
    if (d.method === 'Runtime.exceptionThrown') {
      errors.push(d.params);
    }
    if (d.method === 'Runtime.consoleAPICalled') {
      console.log('Console:', d.params.type, d.params.args?.map(a => a.value || a.description));
    }
    if (d.id && callbacks.has(d.id)) {
      callbacks.get(d.id).resolve(d.result);
      callbacks.delete(d.id);
    }
  };

  // Wait for React to mount
  console.log('Waiting for React to mount...');
  for (let i = 0; i < 50; i++) {
    const mounted = await send('Runtime.evaluate', {
      expression: '!!document.querySelector("#root > div")',
      returnByValue: true
    });
    if (mounted.result?.value) break;
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Wait for PageLoader to finish and clear
  console.log('Waiting for PageLoader to clear...');
  for (let i = 0; i < 50; i++) {
    const loaderExists = await send('Runtime.evaluate', {
      expression: '!!document.querySelector("[role=\\"status\\"]")',
      returnByValue: true
    });
    if (!loaderExists.result?.value) break;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  // Extra cushion for fade out
  await new Promise(r => setTimeout(r, 700));

  const bgInfo = await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('[data-global-bg="true"]');
      if (!el) return { found: false };
      const img = el.querySelector('img');
      const cs = window.getComputedStyle(el);
      const imgCs = img ? window.getComputedStyle(img) : null;
      return {
        found: true,
        zIndex: cs.zIndex,
        position: cs.position,
        imgSrc: img ? img.src : null,
        naturalWidth: img ? img.naturalWidth : 0,
        naturalHeight: img ? img.naturalHeight : 0,
        opacity: imgCs ? imgCs.opacity : null,
        mixBlendMode: imgCs ? imgCs.mixBlendMode : null,
        filter: imgCs ? imgCs.filter : null
      };
    })()`,
    returnByValue: true
  });
  console.log('BG Info on /expertise:', JSON.stringify(bgInfo.result.value, null, 2));

  // Take screenshot
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync('/tmp/expertise-actual.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved /tmp/expertise-actual.png');

  ws.close();
  chrome.kill();
}
test().catch(console.error);
