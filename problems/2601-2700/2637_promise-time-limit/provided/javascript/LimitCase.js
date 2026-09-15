// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   LimitCase exposes this problem's one judged invocation: .fn is the
//   callable built from the case's function source, .inputs are the
//   arguments for that single time limited call, and .t is the limit in
//   virtual milliseconds.
//
//   TIMING IS VIRTUAL. The clock below replaces setTimeout globally
//   before the submission source is evaluated, so the fn internals and
//   the submission's own limit timer arm delays on the same deterministic
//   schedule; real time has no influence on what is judged — only which
//   side of the race settles.

class LimitClock {
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

const coderpuzzleLimitClock = new LimitClock();
const coderpuzzleBuiltinSetTimeout = globalThis.setTimeout;
globalThis.setTimeout = function coderpuzzleVirtualSetTimeout(callback, delay) {
    void coderpuzzleBuiltinSetTimeout;
    coderpuzzleLimitClock.scheduleFrom(coderpuzzleLimitClock.now, Number(delay) || 0, callback);
    return 0;
};

class LimitCase {
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values ([source, inputs, t]) plus the query budget
    // (unused — the driver schedules a bounded number of ticks by design).
    constructor([source, inputs, t], budget) {
        void budget;
        this.inputs = inputs;
        this.t = t;
        // Lexical shadowing plus the global patch above both route to the
        // same virtual clock: an inner arrow's bare `setTimeout` resolves
        // to this parameter even without the patch.
        this.fn = new Function("setTimeout", "return (" + source + ");")(function (callback, delay) {
            coderpuzzleLimitClock.scheduleFrom(coderpuzzleLimitClock.now, Number(delay) || 0, callback);
            return 0;
        });
        this.outcome = null;
    }

    // Hand the case's fn and limit to the submission's timeLimit, call
    // the resulting limited function once with this case's inputs, pump
    // every scheduled settlement in due-time order with microtask
    // checkpoints between fires, then adopt the returned promise's fate
    // as this case's outcome object.
    async drive(timeLimit) {
        if (typeof timeLimit !== "function") {
            throw new Error("timeLimit must be a function");
        }
        const limited = timeLimit(this.fn, this.t);
        if (typeof limited !== "function") {
            throw new Error("timeLimit(fn, t) must return a function");
        }
        const returned = limited(...this.inputs);
        if (!returned || typeof returned.then !== "function") {
            throw new Error("the time limited call must return a promise");
        }
        // A defensive no-op catch marks every rejection as handled up
        // front — the pump below takes several macrotask hops before the
        // adoption at the end, and without this marker a limit-wins race
        // would be flagged unhandled mid-drive instead of surfacing as
        // this case's verdict through the awaited branch.
        returned.catch(() => {});
        // Between ticks the whole microtask waterfall must finish before
        // the next one fires — exactly how real event loops schedule
        // timers behind microtasks. One await leaks only one microtask
        // step, so the barrier is a genuine macrotask hop through the
        // builtin setTimeout captured before the virtual patch.
        let fired = 0;
        while (this.clockSize() > 0) {
            if (++fired > 100000) {
                throw new Error("Virtual tick cap exceeded");
            }
            await LimitCase.hop();
            coderpuzzleLimitClock.fireNext();
            await LimitCase.hop();
        }
        await LimitCase.hop();
        try {
            const value = await returned;
            this.outcome = { resolved: value === undefined ? null : value };
        } catch (reason) {
            this.outcome = { rejected: reason === undefined ? null : reason };
        }
    }

    clockSize() {
        return coderpuzzleLimitClock.size;
    }

    // One macrotask hop on the REAL clock: every pending microtask —
    // however many earlier hops create — drains before it resolves.
    static hop() {
        return new Promise((resolve) => {
            coderpuzzleBuiltinSetTimeout.call(null, resolve, 0);
        });
    }

    verdict() {
        if (this.outcome === null) {
            throw new Error("Returned promise never settled");
        }
        return this.outcome;
    }
}
