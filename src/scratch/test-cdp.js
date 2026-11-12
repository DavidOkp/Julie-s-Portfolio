import { writeFileSync } from 'fs';

async function main() {
  // Fetch targets from Chrome
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
  console.log('Connected to Chrome DevTools Protocol');

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

  // 1. Wait for page loader to finish
  console.log('Waiting for initial PageLoader to clear...');
  for (let i = 0; i < 40; i++) {
    const loaderExists = await evaluate('!!document.querySelector("[role=\'status\']")');
    if (!loaderExists) break;
    await new Promise(r => setTimeout(r, 100));
  }
  console.log('PageLoader cleared! Observing Slide 0 typing...');

  // Track character reveal over time on Slide 0
  for (let i = 0; i < 6; i++) {
    await new Promise(r => setTimeout(r, 350));
    const info = await evaluate(`(() => {
      const activeH1 = document.querySelector('h1#about-hero-title');
      if (!activeH1) return null;
      const visibleChars = Array.from(activeH1.querySelectorAll('[data-char-idx]'))
        .filter(el => window.getComputedStyle(el).opacity === '1')
        .map(el => el.textContent)
        .join('');
      const totalChars = activeH1.querySelectorAll('[data-char-idx]').length;
      return { visibleChars, count: visibleChars.length, totalChars };
    })()`);
    console.log(`[Slide 0] Visible (${info?.count}/${info?.totalChars}): "${info?.visibleChars}"`);
  }

  await screenshot('/home/kennytech/.gemini/antigravity-cli/brain/9e34dabf-4c9d-4261-9a2e-8016e76305d6/scratch/live-slide0-typing.png');

  // Wait for slide 0 to complete
  await new Promise(r => setTimeout(r, 1500));
  const slide0Complete = await evaluate(`(() => {
    const activeH1 = document.querySelector('h1#about-hero-title');
    return Array.from(activeH1.querySelectorAll('[data-char-idx]'))
      .filter(el => window.getComputedStyle(el).opacity === '1')
      .map(el => el.textContent)
      .join('');
  })()`);
  console.log(`[Slide 0 Complete]: "${slide0Complete}"`);
  await screenshot('/home/kennytech/.gemini/antigravity-cli/brain/9e34dabf-4c9d-4261-9a2e-8016e76305d6/scratch/live-slide0-complete.png');

  // Test Manual Slide Navigation: Click Tab 2 ("02 Rigor")
  console.log('Clicking Tab 02 (Capital Rigor)...');
  await evaluate(`(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const tab2 = buttons.find(b => b.textContent.includes('02') || b.textContent.includes('Rigor'));
    if (tab2) tab2.click();
  })()`);

  // Observe Slide 1 immediately typing
  await new Promise(r => setTimeout(r, 500));
  const slide1Typing = await evaluate(`(() => {
    const activeH1 = document.querySelector('h1#about-hero-title');
    return Array.from(activeH1.querySelectorAll('[data-char-idx]'))
      .filter(el => window.getComputedStyle(el).opacity === '1')
      .map(el => el.textContent)
      .join('');
  })()`);
  console.log(`[Slide 1 Typing]: "${slide1Typing}"`);
  await screenshot('/home/kennytech/.gemini/antigravity-cli/brain/9e34dabf-4c9d-4261-9a2e-8016e76305d6/scratch/live-slide1-typing.png');

  // Wait for Slide 1 complete
  await new Promise(r => setTimeout(r, 1800));
  const slide1Complete = await evaluate(`(() => {
    const activeH1 = document.querySelector('h1#about-hero-title');
    return Array.from(activeH1.querySelectorAll('[data-char-idx]'))
      .filter(el => window.getComputedStyle(el).opacity === '1')
      .map(el => el.textContent)
      .join('');
  })()`);
  console.log(`[Slide 1 Complete]: "${slide1Complete}"`);
  await screenshot('/home/kennytech/.gemini/antigravity-cli/brain/9e34dabf-4c9d-4261-9a2e-8016e76305d6/scratch/live-slide1-complete.png');

  // Test Mobile Viewport Rendering
  console.log('Emulating mobile viewport 390x844...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 300));
  await screenshot('/home/kennytech/.gemini/antigravity-cli/brain/9e34dabf-4c9d-4261-9a2e-8016e76305d6/scratch/live-mobile-test.png');

  ws.close();
  console.log('CDP test script completed successfully.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
