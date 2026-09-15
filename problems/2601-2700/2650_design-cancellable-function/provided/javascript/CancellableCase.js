// Problem-provided driver for 2650 design-cancellable-function. Assembled
// into every submission by the judge ahead of the submitted code; never
// editable in the editor. This file is the hidden implementation — solvers
// see only the public API documented in the statement.
//
// The driver owns one case's generatorFunction source and cancelledAt.
// drive() receives the submission's cancellable function, instantiates the
// generator, calls cancellable(generator) exactly once, arms
// setTimeout(cancel, cancelledAt) when cancelledAt is not null, pumps
// every scheduled settlement in due-time order with microtask checkpoints
// between fires, and adopts the returned promise's fate as this case's
// judged outcome object.
//
// TIMING IS VIRTUAL. The clock below replaces setTimeout globally before
// the submission source is evaluated, so the generator internals and the
// driver's own cancel timer arm delays on the same deterministic schedule;
// real time has no influence on what is judged — only which side of each
// race settles first on the shared clock.

class CancellableClock {
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

const coderpuzzleCancellableClock = new CancellableClock();
const coderpuzzleBuiltinSetTimeout = globalThis.setTimeout;
globalThis.setTimeout = function coderpuzzleVirtualSetTimeout(callback, delay) {
    void coderpuzzleBuiltinSetTimeout;
    coderpuzzleCancellableClock.scheduleFrom(coderpuzzleCancellableClock.now, Number(delay) || 0, callback);
    return 0;
};

class CancellableCase {
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values ([source, cancelledAt]) plus the query budget
    // (unused — the driver schedules a bounded number of ticks by design).
    constructor([source, cancelledAt], budget) {
        void budget;
        this.cancelledAt = cancelledAt;
        this.outcome = null;
        // Lexical shadowing plus the global patch above both route to the
        // same virtual clock: a bare `setTimeout` inside the case's
        // generator body resolves to this parameter even without the patch.
        const build = new Function("setTimeout", "return (" + source + ");")(function (callback, delay) {
            coderpuzzleCancellableClock.scheduleFrom(coderpuzzleCancellableClock.now, Number(delay) || 0, callback);
            return 0;
        });
        this.generatorFactory = build;
    }

    // Hand the case's generator to the submission's cancellable, schedule
    // the cancel callback on the virtual clock when requested, pump every
    // scheduled settlement in due-time order with microtask checkpoints
    // between fires, then adopt the returned promise's fate as outcome.
    async drive(cancellableFn) {
        if (typeof cancellableFn !== "function") {
            throw new Error("drive expects the submission's cancellable function");
        }
        const generator = this.generatorFactory();
        if (!generator || typeof generator.next !== "function") {
            throw new Error("the case source must produce a generator object");
        }
        const pair = cancellableFn(generator);
        if (!Array.isArray(pair) || pair.length !== 2) {
            throw new Error("cancellable must return an array of two values");
        }
        const [cancel, promise] = pair;
        if (typeof cancel !== "function") {
            throw new Error("cancellable's first element must be a cancel function");
        }
        if (!promise || typeof promise.then !== "function") {
            throw new Error("cancellable's second element must be a promise");
        }
        // A defensive no-op catch marks rejection as handled up front —
        // the pump below takes several macrotask hops before the adoption
        // at the end, and without this marker a Cancelled rejection would
        // be flagged unhandled mid-drive instead of surfacing as this
        // case's verdict through the awaited branch.
        promise.catch(() => {});
        if (this.cancelledAt !== null && this.cancelledAt !== undefined) {
            setTimeout(cancel, this.cancelledAt);
        }
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
            await CancellableCase.hop();
            coderpuzzleCancellableClock.fireNext();
            await CancellableCase.hop();
        }
        await CancellableCase.hop();
        try {
            const value = await promise;
            this.outcome = value === undefined ? { resolved: null } : { resolved: value };
        } catch (reason) {
            this.outcome = reason === undefined ? { rejected: null } : { rejected: reason };
        }
    }

    clockSize() {
        return coderpuzzleCancellableClock.size;
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
