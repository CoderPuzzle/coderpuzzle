// Problem-provided driver for 2821 delay-the-resolution-of-each-promise.
// Assembled into every submission by the judge ahead of the submitted
// code; never editable in the editor. This file is the hidden
// implementation — solvers see only the public API documented in the
// statement.
//
// DelayCase exposes this problem's one judged invocation: .fns are the
// callables built from the case's function sources (each returns a
// promise), and .ms is the extra settle delay in virtual milliseconds.
//
// TIMING IS VIRTUAL. The clock below replaces setTimeout globally before
// the submission source is evaluated, so the function internals and the
// submission's own delay timers arm delays on the same deterministic
// schedule; real time has no influence on what is judged — only when each
// delayed promise settles.

class DelayClock {
    constructor() {
        this.ticks = [];
        this.sequence = 0;
        this.now = 0;
    }

    // Absolute-time scheduling relative to a base keeps relative
    // setTimeout semantics for code arming timers at later ticks.
    scheduleFrom(base, delay, callback) {
        const tick = {
            time: Math.max(0, base + Math.max(0, delay)),
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
    // microtask checkpoints so settlement cascades fully drain between
    // them.
    fireNext() {
        const tick = this.ticks.shift();
        this.now = tick.time;
        tick.callback();
    }
}

const coderpuzzleDelayClock = new DelayClock();
const coderpuzzleDelayBuiltinSetTimeout = globalThis.setTimeout;
globalThis.setTimeout = function coderpuzzleVirtualSetTimeout(callback, delay) {
    void coderpuzzleDelayBuiltinSetTimeout;
    coderpuzzleDelayClock.scheduleFrom(coderpuzzleDelayClock.now, Number(delay) || 0, callback);
    return 0;
};

class DelayCase {
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values ([functions source strings, ms]) plus the query
    // budget (unused — the driver schedules a bounded number of ticks by
    // design).
    constructor([sources, ms], budget) {
        void budget;
        if (!Array.isArray(sources)) {
            throw new Error("case functions must be an array of sources");
        }
        if (sources.length < 1 || sources.length > 10) {
            throw new Error("case needs 1 <= functions.length <= 10");
        }
        this.ms = ms;
        // Lexical shadowing plus the global patch above both route to the
        // same virtual clock: an inner arrow's bare `setTimeout` resolves
        // to this parameter even without the patch.
        this.fns = sources.map((source) =>
            new Function("setTimeout", "return (" + source + ");")((callback, delay) => {
                coderpuzzleDelayClock.scheduleFrom(coderpuzzleDelayClock.now, Number(delay) || 0, callback);
                return 0;
            }),
        );
        this.settles = null;
    }

    // Hand the case's fns and delay to the submission's delayAll, invoke
    // every returned function once (original order), pump every scheduled
    // settlement in due-time order with microtask checkpoints between
    // fires, and record the virtual elapsed time of each settlement in
    // place — settling order never reshuffles the judged array.
    async drive(delayAll) {
        if (typeof delayAll !== "function") {
            throw new Error("delayAll must be a function");
        }
        const delayed = delayAll(this.fns, this.ms);
        if (!Array.isArray(delayed)) {
            throw new Error("delayAll(functions, ms) must return an array");
        }
        if (delayed.length !== this.fns.length) {
            throw new Error("delayAll(functions, ms) must return one function per input entry");
        }
        this.settles = new Array(delayed.length).fill(null);
        let pending = delayed.length;
        for (let index = 0; index < delayed.length; index++) {
            if (typeof delayed[index] !== "function") {
                throw new Error("every entry of the returned array must be a function");
            }
            const startedAt = coderpuzzleDelayClock.now;
            const record = () => {
                if (this.settles[index] === null) {
                    this.settles[index] = Math.round(coderpuzzleDelayClock.now - startedAt);
                }
                pending--;
            };
            // Both reactions are attached the moment the promise exists, so
            // every rejection path is marked handled from birth and neither
            // fate nor timing depends on whether it resolved or rejected.
            Promise.resolve(delayed[index]()).then(record, record);
        }
        let fired = 0;
        while (pending > 0 && this.clockSize() > 0) {
            if (++fired > 100000) {
                throw new Error("Virtual tick cap exceeded");
            }
            await DelayCase.hop();
            coderpuzzleDelayClock.fireNext();
            await DelayCase.hop();
        }
        await DelayCase.hop();
        await DelayCase.hop();
        if (pending > 0) {
            throw new Error("Not every delayed promise settled");
        }
    }

    clockSize() {
        return coderpuzzleDelayClock.size;
    }

    // One macrotask hop on the REAL clock: every pending microtask —
    // however many earlier hops create — drains before it resolves.
    static hop() {
        return new Promise((resolve) => {
            coderpuzzleDelayBuiltinSetTimeout.call(null, resolve, 0);
        });
    }

    verdict() {
        if (!Array.isArray(this.settles) || this.settles.some((settle) => settle === null)) {
            throw new Error("Returned promises never all settled");
        }
        return this.settles;
    }
}
