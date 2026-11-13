import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

async function run() {
  const chrome = spawn('google-chrome', [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9228',
    '--user-data-dir=/tmp/cdp-test-footer-reveal',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  const res = await fetch('http://127.0.0.1:9228/json');
  const targets = await res.json();
  const page = targets.find(t => t.type === 'page');
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
  ws.onmessage = (e) => {
    const d = JSON.parse(e.data);
    if (d.id && callbacks.has(d.id)) {
      callbacks.get(d.id).resolve(d.result);
      callbacks.delete(d.id);
    }
  };
  await new Promise(r => ws.onopen = r);
  await send('Page.enable');

  console.log('Navigating to http://localhost:5173/about');
  await send('Page.navigate', { url: 'http://localhost:5173/about' });
  await new Promise(r => setTimeout(r, 2500)); // wait for PageLoader

  // Test at scroll = 0
  const topMetrics = await send('Runtime.evaluate', {
    expression: `(() => {
      const footer = document.querySelector('footer');
      const rect = footer.getBoundingClientRect();
      return {
        scrollY: window.scrollY,
        footerTop: rect.top,
        footerBottom: rect.bottom,
        footerHeight: rect.height,
        windowHeight: window.innerHeight
      };
    })()`,
    returnByValue: true
  });
  console.log('Scroll 0 metrics:', topMetrics.result?.value);
  let shot = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync('/tmp/footer-reveal-scroll0.png', Buffer.from(shot.data, 'base64'));

  // Scroll to near bottom (e.g. max scroll - 300px)
  await send('Runtime.evaluate', {
    expression: 'window.scrollTo(0, document.documentElement.scrollHeight - window.innerHeight - 300)'
  });
  await new Promise(r => setTimeout(r, 300));
  const midMetrics = await send('Runtime.evaluate', {
    expression: `(() => {
      const footer = document.querySelector('footer');
      const rect = footer.getBoundingClientRect();
      return {
        scrollY: window.scrollY,
        footerTop: rect.top,
        footerBottom: rect.bottom,
        footerHeight: rect.height,
        windowHeight: window.innerHeight
      };
    })()`,
    returnByValue: true
  });
  console.log('Near bottom metrics (partial reveal):', midMetrics.result?.value);
  shot = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync('/tmp/footer-reveal-mid.png', Buffer.from(shot.data, 'base64'));

  // Scroll to absolute bottom
  await send('Runtime.evaluate', {
    expression: 'window.scrollTo(0, document.documentElement.scrollHeight)'
  });
  await new Promise(r => setTimeout(r, 300));
  const bottomMetrics = await send('Runtime.evaluate', {
    expression: `(() => {
      const footer = document.querySelector('footer');
      const rect = footer.getBoundingClientRect();
      return {
        scrollY: window.scrollY,
        footerTop: rect.top,
        footerBottom: rect.bottom,
        footerHeight: rect.height,
        windowHeight: window.innerHeight
      };
    })()`,
    returnByValue: true
  });
  console.log('Max scroll metrics (full reveal):', bottomMetrics.result?.value);
  shot = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync('/tmp/footer-reveal-bottom.png', Buffer.from(shot.data, 'base64'));

  ws.close();
  chrome.kill();
}

run().catch(console.error);
