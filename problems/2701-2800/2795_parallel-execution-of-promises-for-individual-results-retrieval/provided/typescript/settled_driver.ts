// Problem-provided driver for 2795 parallel-execution-of-promises-for-
// individual-results-retrieval. Assembled into every submission by the judge
// ahead of the submitted code; never editable in the editor. This file is
// the hidden implementation — solvers see only the public API documented in
// the statement.
//
// The case's function specs become live promise-returning functions on a
// deterministic virtual clock: each settles after its stated delay, ticks
// fire in (due time, scheduling order), and drive() pumps them with a
// microtask checkpoint between ticks so every settlement's full promise
// cascade drains before the next one fires. Real time and real timers have
// no influence on what is judged; only the settled array is.

type SettleOutcome =
    { kind: "fulfilled"; value: unknown; delay: number } | { kind: "rejected"; reason: unknown; delay: number };

type FnPromise = () => Promise<unknown>;

class SettledClock {
    private ticks: { time: number; sequence: number; callback: () => void }[] = [];
    private sequence = 0;

    schedule(delay: number, callback: () => void): void {
        const tick = {
            time: Math.max(0, delay),
            sequence: this.sequence++,
            callback,
        };
        const position = this.ticks.findIndex(
            (scheduled) =>
                scheduled.time > tick.time || (scheduled.time === tick.time && scheduled.sequence > tick.sequence),
        );
        if (position === -1) {
            this.ticks.push(tick);
        } else {
            this.ticks.splice(position, 0, tick);
        }
    }

    get size(): number {
        return this.ticks.length;
    }

    // Fire the earliest due tick; the driver interleaves these fires with
    // microtask checkpoints so settlement cascades fully drain between them.
    fireNext(): void {
        this.ticks.shift()!.callback();
    }
}

class SettledDriver {
    readonly functions: FnPromise[];
    private settled: unknown[] | null = null;
    private clock = new SettledClock();

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (the case's function specs) plus the query budget
    // (unused here — the driver schedules a bounded number of ticks by
    // design). The budget stays untyped: the generic wrapper reads it as an
    // opaque value.
    constructor([functions]: any[], budget?: any) {
        void budget;
        // Live functions under test: calling one returns a real promise that
        // settles after its spec's delay elapses on the virtual clock —
        // fulfilled with `value`, or rejected with `reason`. A defensive
        // no-op catch marks every rejection as handled up front, so a
        // submission that forgets its own catch degrades to a wrong answer
        // instead of an unhandledRejection killing the process.
        this.functions = (functions as SettleOutcome[]).map((spec): FnPromise => () => {
            // Live functions under test: calling one returns the ORIGINAL
            // promise, settling after its spec's delay on the virtual
            // clock. A defensive no-op catch is attached as a SIDE
            // handler only (mirroring settled_driver.js) — chaining it
            // would hand the submission a promise whose rejections are
            // already swallowed, degrading every rejection to a
            // fulfillment.
            const promise = new Promise<unknown>((resolve, reject) => {
                this.clock.schedule(spec.delay, () => {
                    if (spec.kind === "fulfilled") resolve(spec.value);
                    else reject(spec.reason);
                });
            });
            void promise.catch(() => undefined);
            return promise;
        });
    }

    // Hand this case's functions to the submission's promiseAllSettled,
    // pump every scheduled settlement in due-time order, then await the
    // returned promise itself. Each tick is followed by a microtask
    // checkpoint, so settlement cascades drain as they happen; the final
    // await adopts whatever resolution hops remain (an async submission
    // chain can add several), and an aggregate that rejects — impossible
    // for a correct implementation — surfaces as a clean runtime error.
    async drive(promiseAllSettled: (functions: FnPromise[]) => Promise<unknown[]>): Promise<void> {
        const returned = promiseAllSettled(this.functions);
        if (!returned || typeof returned.then !== "function") {
            throw new Error("promiseAllSettled must return a promise");
        }
        let fired = 0;
        while (this.clock.size > 0) {
            if (++fired > 100000) {
                throw new Error("Virtual tick cap exceeded");
            }
            this.clock.fireNext();
            await null;
        }
        await null;
        try {
            this.settled = await returned;
        } catch (problem) {
            throw new Error(
                "Returned promise rejected: " + (problem instanceof Error ? problem.message : String(problem)),
            );
        }
    }

    verdict(): unknown[] {
        if (this.settled === null) {
            throw new Error("Returned promise never resolved");
        }
        return this.settled;
    }
}
