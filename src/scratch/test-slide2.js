import { writeFileSync } from 'fs';

async function main() {
  const res = await fetch('http://127.0.0.1:9222/json');
  const targets = await res.json();
  const pageTarget = targets.find(t => t.type === 'page' && t.url.includes('4173'));
  if (!pageTarget) {
    console.error('Target page not found');
    process.exit(1);
  }

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && callbacks.has(data.id)) {
      const { resolve, reject } = callbacks.get(data.id);
      callbacks.delete(data.id);
      if (data.error) reject(data.error);
      else resolve(data.result);
    }
  };

  await new Promise(r => ws.onopen = r);
  await send('Page.enable');
  await send('Runtime.enable');

  async function evaluate(expression) {
    const res = await send('Runtime.evaluate', { expression, returnByValue: true });
    return res.result?.value;
  }

  async function screenshot(filename) {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(filename, Buffer.from(res.data, 'base64'));
    console.log(`Saved screenshot: ${filename}`);
  }

  // Wait for initial PageLoader to clear
  for (let i = 0; i < 40; i++) {
    const loaderExists = await evaluate('!!document.querySelector("[role=\'status\']")');
    if (!loaderExists) break;
    await new Promise(r => setTimeout(r, 100));
  }

  // Click Tab 3 (Counsel)
  console.log('Clicking Tab 03 (Counsel)...');
  await evaluate(`(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const tab3 = buttons.find(b => b.textContent.includes('03') || b.textContent.includes('Counsel'));
    if (tab3) tab3.click();
  })()`);

  // Wait 700ms into typing
  await new Promise(r => setTimeout(r, 700));
  await screenshot('/home/kennytech/.gemini/antigravity-cli/brain/9e34dabf-4c9d-4261-9a2e-8016e76305d6/scratch/live-slide2-midtyping.png');

  ws.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
