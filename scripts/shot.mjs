// Local-only screenshot driver. Launches headless Chrome, points it at the
// stub server, captures the landing page (dark/light/mobile) and the
// workspace with a real verdict seal, writing PNGs to .localonly/shots/.
// The stub server and this driver share the repo's gitignored .localonly/
// directory for the mode file and the screenshots.
//
//   node scripts/stub-server.mjs   # in one terminal
//   node scripts/shot.mjs          # in another
import { mkdirSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const DEBUG_PORT = 9222;
const BASE = "http://127.0.0.1:4173";
// Both resolve against the repo root's .localonly/ — the same place
// stub-server.mjs reads the mode file from.
const OUT_DIR = fileURLToPath(new URL("../.localonly/shots/", import.meta.url));
const MODE_FILE = fileURLToPath(new URL("../.localonly/stub-mode", import.meta.url));

mkdirSync(OUT_DIR, { recursive: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 0;
    this.pending = new Map();
  }
  async open() {
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = () => reject(new Error("WebSocket failed"));
    });
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (!message.id) return;
      const entry = this.pending.get(message.id);
      if (!entry) return;
      this.pending.delete(message.id);
      message.error ? entry.reject(new Error(message.error.message)) : entry.resolve(message.result);
    };
    await this.send("Page.enable");
    await this.send("Runtime.enable");
    await this.send("Emulation.setDeviceMetricsOverride", {
      width: 1440, height: 900, deviceScaleFactor: 1, mobile: false,
    });
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
  async waitFor(expression, timeoutMs = 20000, label = expression) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      if (await this.evaluate(expression)) return;
      await sleep(200);
    }
    throw new Error(`Timed out waiting for: ${label}`);
  }
  async screenshot(name) {
    const { data } = await this.send("Page.captureScreenshot", { format: "png" });
    writeFileSync(`${OUT_DIR}${name}`, Buffer.from(data, "base64"));
    console.log(`  saved ${name}`);
  }
}

function setMode(mode) {
  writeFileSync(MODE_FILE, mode);
}

async function main() {
  const profile = `/tmp/openoj-chrome-${Date.now()}`;
  const proc = spawn(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--window-size=1440,900",
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ], { stdio: "ignore" });

  let wsUrl = null;
  try {
    for (let attempt = 0; attempt < 80 && !wsUrl; attempt += 1) {
      try {
        const tabs = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json();
        wsUrl = tabs.find((tab) => tab.type === "page")?.webSocketDebuggerUrl;
      } catch { /* Chrome still booting */ }
      if (!wsUrl) await sleep(250);
    }
    if (!wsUrl) throw new Error("Chrome debugging endpoint never came up");

    const cdp = new CDP(wsUrl);
    await cdp.open();

    // ── Landing, dark ─────────────────────────────────────────────────────
    setMode("ok");
    await cdp.navigate(`${BASE}/`);
    await cdp.waitFor("document.querySelectorAll('.problem-row').length > 0", 30000, "problem rows");
    await sleep(400);
    await cdp.screenshot("landing-dark.png");

    // ── Landing, light ────────────────────────────────────────────────────
    await cdp.evaluate(`localStorage.setItem('coderpuzzle:theme','light'); location.reload(); true`);
    await cdp.waitFor("document.querySelectorAll('.problem-row').length > 0", 30000, "problem rows (light)");
    await sleep(400);
    await cdp.screenshot("landing-light.png");

    // ── Landing, mobile (dark) ────────────────────────────────────────────
    await cdp.evaluate(`localStorage.setItem('coderpuzzle:theme','dark'); location.reload(); true`);
    await cdp.waitFor("document.querySelectorAll('.problem-row').length > 0", 30000, "problem rows (mobile)");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 390, height: 844, deviceScaleFactor: 2, mobile: true,
    });
    await sleep(400);
    await cdp.screenshot("landing-mobile.png");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440, height: 900, deviceScaleFactor: 1, mobile: false,
    });

    // ── Workspace with verdicts ───────────────────────────────────────────
    await cdp.navigate(`${BASE}/problems/two-sum`);
    await cdp.waitFor("!!document.querySelector('.run-button') && !document.querySelector('.run-button').disabled", 40000, "editor ready");
    await cdp.waitFor("!!document.querySelector('.monaco-editor')", 40000, "monaco mounted");
    await sleep(1200);

    // AC (run mode "ok" → completed → OK seal)
    await cdp.evaluate(`document.querySelector('.run-button').click(); true`);
    await cdp.waitFor("!!document.querySelector('.seal')", 20000, "verdict seal (OK)");
    await sleep(600);
    await cdp.screenshot("workspace-ok.png");

    // WA (flip the stub mode, run again → wrong_answer seal)
    setMode("wa");
    await cdp.evaluate(`document.querySelector('.run-button').click(); true`);
    await cdp.waitFor("document.querySelector('.seal')?.textContent.trim() === 'WA'", 20000, "verdict seal (WA)");
    await sleep(600);
    await cdp.screenshot("workspace-wa.png");

    // TLE
    setMode("tle");
    await cdp.evaluate(`document.querySelector('.run-button').click(); true`);
    await cdp.waitFor("document.querySelector('.seal')?.textContent.trim() === 'TLE'", 20000, "verdict seal (TLE)");
    await sleep(600);
    await cdp.screenshot("workspace-tle.png");

    setMode("ok");
    console.log("All screenshots captured.");
  } finally {
    proc.kill("SIGKILL");
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
