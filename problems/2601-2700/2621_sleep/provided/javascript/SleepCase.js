// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   SleepCase carries one case's duration (.millis). measure() is called
//   by the submission with its async sleep — the driver times the awaited
//   call and fails (a runtime error) when resolution lands more than
//   EARLY_TOLERANCE_MS before millis; modest overshoot is left to the
//   judge clock. On success one "resolved" row is recorded, and verdict()
//   reports [[ "resolved" ]] — the judged transcript.
const EARLY_TOLERANCE_MS = 25;

class SleepCase {
    constructor(values) {
        const [millis] = values;
        if (!Number.isInteger(millis) || millis < 1 || millis > 1000) {
            throw new Error("millis must be an integer in [1, 1000]");
        }
        this.millis = millis;
        this.outputs = [];
    }

    // Await the submission's sleep once, timed from the driver side.
    async measure(asyncSleep) {
        if (typeof asyncSleep !== "function") {
            throw new Error("measure expects the sleep function");
        }
        const pending = asyncSleep(this.millis);
        if (!pending || typeof pending !== "object" || typeof pending.then !== "function") {
            throw new Error("sleep must be asynchronous (return a Promise)");
        }
        const startedAt = Date.now();
        await pending;
        const waited = Date.now() - startedAt;
        if (waited < this.millis - EARLY_TOLERANCE_MS) {
            throw new Error(`sleep(${this.millis}) resolved after only ${waited} ms`);
        }
        this.outputs.push(["resolved"]);
    }

    verdict() {
        return this.outputs;
    }
}
