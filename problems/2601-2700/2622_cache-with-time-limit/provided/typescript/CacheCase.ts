// Problem-provided driver for 2622 cache-with-time-limit. Assembled into
// every submission by the judge ahead of the submitted code; never editable
// in the editor. This file is the hidden implementation — solvers see only
// the public API documented in the statement.
//
// The driver owns one case's actions/values/timeDelays script (the same
// shape as the statement's Input) and replays it against the submission's
// TimeLimitedCache class on a deterministic virtual clock: while drive()
// runs, Date.now() and performance.now() report simulated milliseconds and
// setTimeout/clearTimeout schedule against that same clock; the originals
// are restored when the replay returns. timeDelays[i] is the elapsed time
// from the replay's start at which action i executes; before each action
// the clock advances to that instant, firing every due timer first in
// firing order — earliest fireAt, ties by insertion order, like a real
// event loop. A key set at time t with duration d expires at t+d: any
// action landing exactly at t+d observes it gone. The judged verdict is
// the recorded transcript: null for the construction and each method's
// return value afterwards.

class CacheCase {
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (actions, values, timeDelays) plus the query budget
    // (unused — replaying a bounded script needs no call accounting).
    constructor(values: any[], _queryBudget?: unknown) {
        const [actions, scriptValues, timeDelays] = values;
        void _queryBudget;
        this.actions = actions;
        this.values = scriptValues;
        this.timeDelays = timeDelays;
        this.outputs = [];
    }

    actions: any[];
    values: any[][];
    timeDelays: number[];
    outputs: any[];

    // Swap the wall clock for the virtual scheduler. Returns a function
    // restoring every patched global.
    _install(state: { now: number }, timers: any[]): () => void {
        let sequence = 0;
        const handles = new Map<number, any>();
        const originalDate = globalThis.Date as any;
        const originalPerformance = globalThis.performance as any;
        const originalSetTimeout = globalThis.setTimeout;
        const originalClearTimeout = globalThis.clearTimeout;

        originalDate.now = () => state.now;
        if (originalPerformance && typeof originalPerformance.now === "function") {
            originalPerformance.now = () => state.now;
        }
        globalThis.setTimeout = ((fn: (...args: any[]) => void, delay?: number) => {
            const entry = {
                id: ++sequence,
                at: state.now + Math.max(0, Number(delay) || 0),
                fn: fn,
                cancelled: false,
            };
            handles.set(entry.id, entry);
            timers.push(entry);
            return entry.id;
        }) as any;
        globalThis.clearTimeout = ((handle?: any) => {
            const entry = handles.get(Number(handle));
            if (entry !== undefined) {
                entry.cancelled = true;
            }
        }) as any;
        return () => {
            delete (originalDate as any).now;
            if (originalPerformance && typeof originalPerformance.now === "function") {
                delete originalPerformance.now;
            }
            globalThis.performance = originalPerformance;
            globalThis.setTimeout = originalSetTimeout;
            globalThis.clearTimeout = originalClearTimeout;
        };
    }

    // Advance the virtual clock to `target`, firing every timer whose
    // deadline has arrived — earliest first, ties by insertion order.
    // Scripts never move time backwards; the Math.max guard keeps a
    // malformed row from rewinding the clock.
    _advanceTo(state: { now: number }, timers: any[], target: number): void {
        target = Math.max(state.now, target);
        for (;;) {
            let due: any = null;
            for (const entry of timers) {
                if (entry.cancelled) {
                    continue;
                }
                if (due === null || entry.at < due.at || (entry.at === due.at && entry.id < due.id)) {
                    due = entry;
                }
            }
            if (due === null || due.at > target) {
                break;
            }
            timers.splice(timers.indexOf(due), 1);
            state.now = Math.max(state.now, due.at);
            due.fn();
        }
        state.now = target;
    }

    // Replay this case's script against the submission's TimeLimitedCache
    // class, recording one transcript row per action.
    drive(cacheClass: any): void {
        const absoluteTimes = this.timeDelays.slice();

        const state = { now: 0 };
        const timers: any[] = [];
        const restore = this._install(state, timers);
        try {
            let cache: any = null;
            for (let at = 0; at < this.actions.length; at++) {
                this._advanceTo(state, timers, absoluteTimes[at]);
                const action = this.actions[at];
                const args = this.values[at];
                if (action === "TimeLimitedCache") {
                    if (cache !== null) {
                        throw new Error("the script constructs TimeLimitedCache more than once");
                    }
                    cache = new cacheClass();
                    this.outputs.push(null);
                } else if (action === "set") {
                    if (cache === null) {
                        throw new Error("the script must construct the TimeLimitedCache first");
                    }
                    this.outputs.push(cache.set(args[0], args[1], args[2]));
                } else if (action === "get") {
                    if (cache === null) {
                        throw new Error("the script must construct the TimeLimitedCache first");
                    }
                    this.outputs.push(cache.get(args[0]));
                } else if (action === "count") {
                    if (cache === null) {
                        throw new Error("the script must construct the TimeLimitedCache first");
                    }
                    this.outputs.push(cache.count());
                } else {
                    throw new Error("Unknown action: " + action);
                }
            }
        } finally {
            restore();
        }
    }

    verdict(): any[] {
        return this.outputs;
    }
}
