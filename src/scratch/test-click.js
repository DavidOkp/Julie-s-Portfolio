import { spawn } from 'child_process';

async function testClickWithWait() {
  const chrome = spawn('google-chrome', [
    '--headless=new',
    '--no-sandbox',
    '--remote-debugging-port=9231',
    '--user-data-dir=/tmp/cdp-test-footer-click2',
    '--window-size=1440,900',
    'http://localhost:5173/about'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  const res = await fetch('http://127.0.0.1:9231/json');
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

  // Wait for PageLoader to clear
  for (let i = 0; i < 60; i++) {
    const r = await send('Runtime.evaluate', {
      expression: '!!document.querySelector("[role=\\"status\\"]")',
      returnByValue: true
    });
    if (!r.result?.value) break;
    await new Promise(res => setTimeout(res, 200));
  }
  await new Promise(r => setTimeout(r, 600));

  // Scroll to bottom
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, document.documentElement.scrollHeight)' });
  await new Promise(r => setTimeout(r, 500));

  // Check element at center of footer and button
  const elInfo = await send('Runtime.evaluate', {
    expression: `(() => {
      const footer = document.querySelector('footer');
      const rect = footer.getBoundingClientRect();
      const elAtCenter = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      const btn = document.querySelector('footer button');
      const btnRect = btn.getBoundingClientRect();
      const elAtBtn = document.elementFromPoint(btnRect.left + 5, btnRect.top + 5);
      return {
        footerTag: elAtCenter ? elAtCenter.closest('footer') !== null : false,
        elAtCenterTag: elAtCenter ? elAtCenter.tagName : null,
        elAtBtnTag: elAtBtn ? elAtBtn.tagName : null,
        isButtonOrChild: elAtBtn ? (elAtBtn.tagName === 'BUTTON' || !!elAtBtn.closest('button')) : false
      };
    })()`,
    returnByValue: true
  });
  console.log('Clickability at bottom:', elInfo.result?.value);

  // Click 'Back to top'
  await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('footer button');
      if (btn) btn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 1000));

  const scrollAfter = await send('Runtime.evaluate', {
    expression: 'window.scrollY',
    returnByValue: true
  });
  console.log('ScrollY after clicking Back to top:', scrollAfter.result?.value);

  ws.close();
  chrome.kill();
}
testClickWithWait().catch(console.error);
