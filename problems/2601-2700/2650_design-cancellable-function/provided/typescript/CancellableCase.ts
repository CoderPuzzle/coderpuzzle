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

interface CancellableTick {
    time: number;
    sequence: number;
    callback: () => void;
}

class CancellableClock {
    private ticks: CancellableTick[] = [];
    private sequence = 0;
    now = 0;

    // Absolute-time scheduling relative to a base keeps relative
    // setTimeout semantics for code arming timers at later ticks.
    scheduleFrom(base: number, delay: number, callback: () => void): void {
        const tick: CancellableTick = {
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

    get size(): number {
        return this.ticks.length;
    }

    // Fire the earliest due tick; the driver interleaves these fires with
    // microtask checkpoints so settlement cascades fully drain between
    // them.
    fireNext(): void {
        const tick = this.ticks.shift()!;
        this.now = tick.time;
        tick.callback();
    }
}

const coderpuzzleCancellableClock = new CancellableClock();
// Ambient timer name for submissions (the judge compiles with ES libs
// only): at run time this resolves to the virtual patched version below.
declare const setTimeout: (callback: (...args: any[]) => void, delay?: number) => number;
const coderpuzzleBuiltinSetTimeout: (callback: (...args: any[]) => void, delay?: number) => unknown = (
    globalThis as any
).setTimeout;

(globalThis as any).setTimeout = function coderpuzzleVirtualSetTimeout(
    callback: (...args: any[]) => void,
    delay?: number,
): number {
    void (coderpuzzleBuiltinSetTimeout as any);
    coderpuzzleCancellableClock.scheduleFrom(coderpuzzleCancellableClock.now, Number(delay) || 0, callback);
    return 0;
};

class CancellableCase {
    cancelledAt: number | null;
    outcome: { resolved: unknown } | { rejected: unknown } | null;
    generatorFactory: () => Generator;

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values ([source, cancelledAt]) plus the query budget
    // (unused — the driver schedules a bounded number of ticks by design).
    constructor(values: any[], _queryBudget?: unknown) {
        const [source, cancelledAt] = values;
        void _queryBudget;
        this.cancelledAt = cancelledAt as number | null;
        this.outcome = null;
        // Lexical shadowing plus the global patch above both route to the
        // same virtual clock: a bare `setTimeout` inside the case's
        // generator body resolves to this parameter even without the patch.
        const build = new Function("setTimeout", "return (" + source + ");")(function (
            callback: (...args: any[]) => void,
            delay?: number,
        ) {
            coderpuzzleCancellableClock.scheduleFrom(coderpuzzleCancellableClock.now, Number(delay) || 0, callback);
            return 0;
        }) as () => Generator;
        this.generatorFactory = build;
    }

    clockSize(): number {
        return coderpuzzleCancellableClock.size;
    }

    // One macrotask hop on the REAL clock: every pending microtask —
    // however many earlier hops create — drains before it resolves.
    static hop(): Promise<void> {
        return new Promise<void>((resolve) => {
            coderpuzzleBuiltinSetTimeout(resolve, 0);
        });
    }

    // Hand the case's generator to the submission's cancellable, schedule
    // the cancel callback on the virtual clock when requested, pump every
    // scheduled settlement in due-time order with microtask checkpoints
    // between fires, then adopt the returned promise's fate as outcome.
    async drive(cancellableFn: (generator: Generator) => [() => void, Promise<unknown>]): Promise<void> {
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
        (promise as Promise<unknown>).catch(() => {});
        if (this.cancelledAt !== null && this.cancelledAt !== undefined) {
            setTimeout(cancel, this.cancelledAt as number);
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

    verdict(): { resolved: unknown } | { rejected: unknown } {
        if (this.outcome === null) {
            throw new Error("Returned promise never settled");
        }
        return this.outcome;
    }
}
