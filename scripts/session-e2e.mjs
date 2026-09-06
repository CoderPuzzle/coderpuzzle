// Local-only E2E: drives the real frontend against the real API through the
// guest-session gate: gate shows -> Continue as guest -> problems load ->
// open a problem -> type code -> reload -> draft persists.
import { spawn } from "node:child_process";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const DEBUG_PORT = 9225;
const BASE = "http://127.0.0.1:4174";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 0;
    this.pending = new Map();
    this.consoleErrors = [];
  }
  async open() {
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = () => reject(new Error("WebSocket failed"));
    });
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.method === "Runtime.exceptionThrown") {
        this.consoleErrors.push(`EXCEPTION: ${message.params.exceptionDetails.text}`);
      }
      if (message.method === "Log.entryAdded" && message.params.entry.level === "error") {
        this.consoleErrors.push(`LOG: ${message.params.entry.text}`);
      }
      if (!message.id) return;
      const entry = this.pending.get(message.id);
      if (!entry) return;
      this.pending.delete(message.id);
      message.error ? entry.reject(new Error(message.error.message)) : entry.resolve(message.result);
    };
    await this.send("Page.enable");
    await this.send("Runtime.enable");
    await this.send("Log.enable");
  }
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.nextId;
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async evaluate(expression) {
    const response = await this.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
    return response.result.value;
  }
  async navigate(url) {
    await this.send("Page.navigate", { url });
  }
  async waitFor(expression, timeoutMs = 30000, label = expression) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      if (await this.evaluate(expression)) return;
      await sleep(200);
    }
    throw new Error(`Timed out waiting for: ${label}`);
  }
}

const assert = (label, condition) => {
  console.log(`${condition ? "PASS" : "FAIL"} ${label}`);
  if (!condition) process.exitCode = 1;
};

async function main() {
  const profile = `/tmp/openoj-chrome-e2e-${Date.now()}`;
  const proc = spawn(CHROME, [
    "--headless=new", "--disable-gpu", "--no-sandbox",
    "--window-size=1440,900",
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ], { stdio: "ignore" });

  try {
    let wsUrl = null;
    for (let attempt = 0; attempt < 80 && !wsUrl; attempt += 1) {
      try {
        const tabs = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json();
        wsUrl = tabs.find((tab) => tab.type === "page")?.webSocketDebuggerUrl;
      } catch { /* booting */ }
      if (!wsUrl) await sleep(250);
    }
    const cdp = new CDP(wsUrl);
    await cdp.open();
    await cdp.navigate(`${BASE}/`);
    await cdp.waitFor("!!document.querySelector('.guest-gate')", 30000, "guest gate");
    assert("gate shown on first visit", await cdp.evaluate("!!document.querySelector('.gate-enter')"));
    assert("no session gate notice on first visit", await cdp.evaluate("!document.querySelector('.gate-notice')"));

    await cdp.evaluate("document.querySelector('.gate-enter').click(); true");
    await cdp.waitFor("document.querySelectorAll('.problem-row').length > 0", 40000, "problem list");
    assert("problems load after entering as guest", true);

    await cdp.evaluate("location.href = '/problems/two-sum'; true");
    await cdp.waitFor("!!document.querySelector('.monaco-editor')", 40000, "editor");
    await sleep(800);
    // Focus the editor and type via CDP input (no window.monaco global exists
    // with @monaco-editor/react's loader).
    await cdp.evaluate("document.querySelector('.monaco-editor textarea').focus(); true");
    await cdp.send("Input.insertText", { text: "# guest-session e2e marker\n" });
    await sleep(1400); // debounce flush
    const stored = await cdp.evaluate(`(async () => (await (await fetch('/api/drafts/two-sum')).json()))()`);
    const marker = Array.isArray(stored) && stored.some((row) => row.code.includes("guest-session e2e marker"));
    assert("draft saved server-side", marker);

    await cdp.navigate(`${BASE}/problems/two-sum`);
    await cdp.waitFor("!!document.querySelector('.monaco-editor')", 40000, "editor after reload");
    try {
      await cdp.waitFor(
        `(document.querySelector('.view-lines')?.textContent ?? '').replace(/\u00a0/g, ' ').includes('guest-session e2e marker')`,
        60000, "draft restored in editor",
      );
      assert("draft survives reload", true);
    } catch {
      console.log("  diagnostics — view-lines:", (await cdp.evaluate("document.querySelector('.view-lines')?.textContent?.slice(0, 140) ?? 'NONE'")));
      console.log("  diagnostics — drafts:", await cdp.evaluate("(async () => JSON.stringify(await (await fetch('/api/drafts/two-sum')).json()))()"));
      console.log("  diagnostics — poll expr value:", await cdp.evaluate(`(document.querySelector('.view-lines')?.textContent ?? '').replace(/\u00a0/g, ' ').includes('guest-session e2e marker')`));
      console.log("  diagnostics — codepoints:", await cdp.evaluate(`JSON.stringify([...(document.querySelector('.view-lines')?.textContent ?? '').slice(0, 40)].map(c => c.codePointAt(0)))`));
      console.log("  diagnostics — cookie:", await cdp.evaluate("document.cookie || '(none, httponly)'"));
      assert("draft survives reload", false);
    }

    const noise = cdp.consoleErrors.filter((line) => !line.includes("401"));
    assert("no console errors (401 boot probe excluded)", noise.length === 0);
    if (noise.length) console.log(noise);

    // Font checks: Roboto Mono across editor, markdown code, testcase fields
    const font = (sel) => cdp.evaluate(`(document.querySelector('${sel}') ? getComputedStyle(document.querySelector('${sel}')).fontFamily : 'MISSING')`);
    const mdCode = await font(".markdown-body code");
    const caseField = await font(".case-field textarea");
    const monacoLines = await font(".view-lines");
    console.log(`md code font: ${mdCode}`);
    console.log(`case field font: ${caseField}`);
    console.log(`monaco line font: ${monacoLines}`);
    assert("Roboto Mono in markdown code", mdCode.includes("Roboto Mono"));
    assert("Roboto Mono in testcase fields", caseField.includes("Roboto Mono"));
    assert("Roboto Mono in editor", monacoLines.includes("Roboto Mono"));
  } finally {
    proc.kill("SIGKILL");
  }
}

main().catch((error) => {
  console.error("E2E ERROR:", error.message);
  process.exit(1);
});
