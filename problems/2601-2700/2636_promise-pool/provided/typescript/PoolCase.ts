// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   PoolCase turns this case's function specs into live promise-returning
//   functions on a deterministic virtual clock — calling functions[i]()
//   starts job i at the current tick and its promise settles at
//   start + delay, while the carrier records both ticks. drive() hands
//   the live functions and the pool limit to the submission's
//   promisePool, pumps every scheduled settlement in due-time order with
//   full-drain barriers between fires, awaits the returned promise, and
//   verdict() reports [[start ticks], [end ticks]]. Real time and real
//   timers have no influence on what is judged; only the schedule is.

interface PoolTick {
    time: number;
    sequence: number;
    callback: () => void;
}

const coderpuzzleBuiltinSetTimeout: (callback: (...args: any[]) => void, delay?: number) => unknown =
    globalThis.setTimeout;

class PoolClock {
    private ticks: PoolTick[] = [];
    private sequence = 0;
    now = 0;

    scheduleAt(time: number, callback: () => void): void {
        const tick: PoolTick = {
            time: Math.max(0, time),
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

class PoolCase {
    specs: { delay: number }[];
    limit: number;
    clock: PoolClock;
    starts: (number | undefined)[];
    ends: (number | undefined)[];
    functions: (() => Promise<null>)[];

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values ([specs, n]) plus the query budget (unused — the
    // driver schedules a bounded number of ticks by design).
    constructor(values: any[], _queryBudget?: unknown) {
        const [functions, n] = values;
        void _queryBudget;
        this.specs = functions;
        this.limit = n;
        this.clock = new PoolClock();
        this.starts = new Array(functions.length).fill(undefined);
        this.ends = new Array(functions.length).fill(undefined);
        // Live functions under test: invoking one starts its job at the
        // current virtual tick; the promise settles exactly `delay` later.
        this.functions = functions.map((spec: { delay: number }, index: number) => () => {
            if (this.starts[index] !== undefined) {
                throw new Error("function " + index + " started twice");
            }
            this.starts[index] = this.clock.now;
            return new Promise<null>((resolve) => {
                this.clock.scheduleAt((this.starts[index] as number) + spec.delay, () => {
                    this.ends[index] = this.clock.now;
                    resolve(null);
                });
            });
        });
    }

    // Hand this case's functions plus the limit to the submission's
    // promisePool, pump every scheduled settlement in due-time order,
    // then await the returned promise itself. Between fires the whole
    // microtask waterfall must finish before the next tick fires — how
    // real event loops schedule timers behind microtasks. One await
    // leaks only one microtask step, so each barrier is a genuine
    // macrotask hop through the builtin setTimeout captured above.
    async drive(promisePool: (functions: (() => Promise<null>)[], n: number) => Promise<unknown>): Promise<void> {
        const returned = promisePool(this.functions, this.limit);
        if (!returned || typeof returned.then !== "function") {
            throw new Error("promisePool must return a promise");
        }
        // A defensive no-op catch marks any rejection as handled up
        // front — a broken submission degrades to a verdict error at the
        // awaited branch below instead of crashing the driver mid-pump.
        (returned as Promise<unknown>).catch(() => {});
        let fired = 0;
        while (this.clock.size > 0) {
            if (++fired > 100000) {
                throw new Error("Virtual tick cap exceeded");
            }
            await PoolCase.hop();
            this.clock.fireNext();
            await PoolCase.hop();
        }
        await PoolCase.hop();
        try {
            await returned;
        } catch (problem) {
            throw new Error(
                "Returned promise rejected: " + (problem && problem.message ? problem.message : String(problem)),
            );
        }
    }

    // One macrotask hop on the REAL clock: every pending microtask —
    // however many earlier hops create — drains before it resolves.
    static hop(): Promise<void> {
        return new Promise<void>((resolve) => {
            coderpuzzleBuiltinSetTimeout(resolve, 0);
        });
    }

    verdict(): [number[], number[]] {
        if ((this.starts as (number | undefined)[]).some((tick) => tick === undefined)) {
            throw new Error("Not every function was ever started");
        }
        return [this.starts as number[], this.ends as number[]];
    }
}
