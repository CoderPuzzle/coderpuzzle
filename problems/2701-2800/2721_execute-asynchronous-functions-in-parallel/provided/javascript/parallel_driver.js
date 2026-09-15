// Problem-provided driver for 2721 execute-asynchronous-functions-in-
// parallel. Assembled into every submission by the judge ahead of the
// submitted code; never editable in the editor. This file is the hidden
// implementation — solvers see only the public API documented in the
// statement.
//
// The case's function specs become live promise-returning functions on a
// deterministic virtual clock: each settles after its stated delay, ticks
// fire in (due time, scheduling order), and drive() pumps them with a
// microtask checkpoint between ticks so every settlement's full promise
// cascade drains before the next one fires. Real time and real timers have
// no influence on what is judged; only the returned promise's eventual
// outcome — one resolved array or one first-rejection reason — is.

class ParallelClock {
    constructor() {
        this.ticks = [];
        this.sequence = 0;
    }

    schedule(delay, callback) {
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

    get size() {
        return this.ticks.length;
    }

    // Fire the earliest due tick; the driver interleaves these fires with
    // microtask checkpoints so settlement cascades fully drain between them.
    fireNext() {
        this.ticks.shift().callback();
    }
}

class ParallelDriver {
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (the case's function specs) plus the query budget
    // (unused — the driver schedules a bounded number of ticks by design).
    constructor([functions], budget) {
        void budget;
        this.specs = functions;
        this.clock = new ParallelClock();
        // Live functions under test: calling one returns a real promise that
        // settles after its spec's delay elapses on the virtual clock —
        // fulfilled with `value`, or rejected with `reason`. A defensive
        // no-op catch is attached as a SIDE handler only, so even a
        // submission that forgets rejection handling degrades to a wrong
        // answer instead of an unhandledRejection killing the process;
        // chaining it instead would swallow rejections and degrade every
        // one to a fulfillment.
        this.functions = functions.map((spec) => () => {
            const promise = new Promise((resolve, reject) => {
                this.clock.schedule(spec.delay, () => {
                    if (spec.kind === "fulfilled") resolve(spec.value);
                    else reject(spec.reason);
                });
            });
            promise.catch(() => {});
            return promise;
        });
        this.outcome = null;
    }

    // Hand this case's functions to the submission's promiseAll, pump every
    // scheduled settlement in due-time order, then adopt the returned
    // promise's own fate: fulfillment records the resolved array; rejection
    // records the winning reason exactly as the platform delivered it (a
    // promise settles once, so the first rejection inherently wins and all
    // later attempts are no-ops). Each tick is followed by a microtask
    // checkpoint so settlement cascades drain as they happen; the final
    // await adopts whatever resolution hops remain before verdict() reads
    // the recorded outcome. A promise that never settles surfaces as a
    // time limit exceeded, not a silent pass.
    async drive(promiseAll) {
        const returned = promiseAll(this.functions);
        if (!returned || typeof returned.then !== "function") {
            throw new Error("promiseAll must return a promise");
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
            this.outcome = { resolved: await returned };
        } catch (reason) {
            this.outcome = { rejected: reason };
        }
    }

    verdict() {
        if (this.outcome === null) {
            throw new Error("Returned promise never settled");
        }
        return this.outcome;
    }
}
