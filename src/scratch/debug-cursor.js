import { writeFileSync } from 'fs';

async function main() {
  const res = await fetch('http://127.0.0.1:9222/json');
  const targets = await res.json();
  const pageTarget = targets.find(t => t.type === 'page' && t.url.includes('4173'));

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

  // Restore Desktop Viewport 1440x900
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  // Wait for PageLoader to clear
  for (let i = 0; i < 40; i++) {
    const loaderExists = await evaluate('!!document.querySelector("[role=\'status\']")');
    if (!loaderExists) break;
    await new Promise(r => setTimeout(r, 100));
  }

  // Navigate to slide 2
  await evaluate(`(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const tab3 = buttons.find(b => b.textContent.includes('03') || b.textContent.includes('Counsel'));
    if (tab3) tab3.click();
  })()`);

  // Log cursor positions over time
  for (let step = 0; step < 25; step++) {
    await new Promise(r => setTimeout(r, 100));
    const data = await evaluate(`(() => {
      const activeH1 = Array.from(document.querySelectorAll('h1#about-hero-title')).find(h => {
        const slideContainer = h.closest('[class*=\"relative z-10\"]');
        return !!slideContainer;
      });
      if (!activeH1) return null;

      const cursor = activeH1.querySelector('[class*=\"cursor\"], [class*=\"align-[-0.05em]\"]');
      const cursorRect = cursor ? cursor.getBoundingClientRect() : null;
      
      const charNodes = Array.from(activeH1.querySelectorAll('[data-char-idx]'));
      const visibleChars = charNodes.filter(c => window.getComputedStyle(c).opacity === '1');
      const lastVisible = visibleChars[visibleChars.length - 1];
      const lastRect = lastVisible ? lastVisible.getBoundingClientRect() : null;

      return {
        step: ${step},
        text: visibleChars.map(c => c.textContent).join(''),
        cursor: cursorRect ? { x: Math.round(cursorRect.left), y: Math.round(cursorRect.top), h: Math.round(cursorRect.height) } : null,
        lastChar: lastRect ? { x: Math.round(lastRect.left), y: Math.round(lastRect.top), char: lastVisible.textContent } : null,
        parentTag: cursor?.parentNode?.tagName,
        prevSibling: cursor?.previousSibling?.textContent,
        nextSibling: cursor?.nextSibling?.textContent
      };
    })()`);
    console.log(JSON.stringify(data));
  }

  ws.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
