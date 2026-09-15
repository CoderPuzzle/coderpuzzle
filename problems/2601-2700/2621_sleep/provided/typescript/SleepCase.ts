// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   SleepCase carries one case's duration (.millis). measure() is called
//   by the submission with its async sleep — the driver times the awaited
//   call and fails (a runtime error) when resolution lands more than
//   EARLY_TOLERANCE_MS before millis; modest overshoot is left to the
//   judge clock. On success one "resolved" row is recorded, and verdict()
//   reports [[ "resolved" ]] — the judged transcript.
const EARLY_TOLERANCE_MS = 25;

type SleepFunction = (millis: number) => Promise<unknown>;

class SleepCase {
    readonly millis: number;
    private outputs: string[][] = [];

    constructor(values: any[], _queryBudget?: unknown) {
        const [millis] = values;
        if (!Number.isInteger(millis) || millis < 1 || millis > 1000) {
            throw new Error("millis must be an integer in [1, 1000]");
        }
        this.millis = millis as number;
    }

    // Await the submission's sleep once, timed from the driver side.
    async measure(asyncSleep: SleepFunction): Promise<void> {
        const startedAt = Date.now();
        const pending = asyncSleep(this.millis) as unknown;
        if (!pending || typeof pending !== "object" || typeof (pending as { then?: unknown }).then !== "function") {
            throw new Error("sleep must be asynchronous (return a Promise)");
        }
        await pending;
        const waited = Date.now() - startedAt;
        if (waited < this.millis - EARLY_TOLERANCE_MS) {
            throw new Error(`sleep(${this.millis}) resolved after only ${waited} ms`);
        }
        this.outputs.push(["resolved"]);
    }

    verdict(): string[][] {
        return this.outputs;
    }
}
