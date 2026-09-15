// bundle-provided driver for 2725 interval-cancellation. Assembled into
// every submission by the judge ahead of the submitted code; never
// editable in the editor. This file is the hidden implementation —
// solvers see only the public API documented in the statement.
//
// Judging runs on a deterministic virtual clock, so real time and real
// timers have no influence on what is judged. drive() swaps the global
// setTimeout/clearTimeout/setInterval/clearInterval for virtual-clock
// equivalents, builds a recorder fn from the case's fn source (every
// actual execution evaluates it over the case args and records one
// transcript row {time, returned}), calls the submission's
// cancellable(fn, args, t) — so the required immediate call records at
// time 0 before any timer has fired — schedules the returned cancelFn
// at the case's cancelTimeMs, then drains every scheduled timer to
// completion: earliest deadline first, ties broken by scheduling order,
// which is exactly how Node drains its timer phase. A repeating entry
// keeps its id across refires (clearInterval must reach it), one-shot
// entries leave the queue after firing. The clock pins to each fired
// deadline itself, so rows record their own instant; verdict() returns
// the rows in execution order.

// Ambient node globals for the assembled environment (the compile runs
// without DOM/node libs); both this driver and the submission's typed
// code may call setInterval/setTimeout idiomatically.
declare function setTimeout(callback: (...args: any[]) => void, delay?: number): number;
declare function clearTimeout(handle: number | undefined): void;
declare function setInterval(callback: (...args: any[]) => void, delay?: number): number;
declare function clearInterval(handle: number | undefined): void;

interface IntervalTimerEntry {
    due: number;
    period: number | null;
    sequence: number;
    callback: () => void;
    canceled: boolean;
}

class IntervalCase {
    fnSource: string;
    args: any[];
    t: number;
    cancelTimeMs: number;
    events: { time: number; returned: unknown }[];
    steps = 0;

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (fn, args, t, cancelTimeMs) plus the query budget
    // (unused — replaying a bounded cancel script needs no accounting).
    constructor(values: any[], _queryBudget?: unknown) {
        const [fn, args, t, cancelTimeMs] = values;
        this.fnSource = fn;
        this.args = args;
        this.t = t;
        this.cancelTimeMs = cancelTimeMs;
        this.events = [];
    }

    drive(cancellable: (fn: (...inputs: any[]) => unknown, args: any[], t: number) => (...args: any[]) => void): void {
        const globalObject = globalThis as any;
        const realSetTimeout = globalObject.setTimeout;
        const realClearTimeout = globalObject.clearTimeout;
        const realSetInterval = globalObject.setInterval;
        const realClearInterval = globalObject.clearInterval;
        let now = 0;
        let sequence = 0;
        let nextId = 1;
        const timers = new Map<number, IntervalTimerEntry>(); // id -> entry

        const setTimeoutImpl = (callback: () => void, delay: number): number => {
            if (typeof callback !== "function") {
                throw new Error("setTimeout needs a callback function");
            }
            const id = nextId++;
            timers.set(id, {
                due: now + Math.max(0, Number(delay) || 0),
                period: null,
                sequence: sequence++,
                callback,
                canceled: false,
            });
            return id;
        };
        const setIntervalImpl = (callback: () => void, delay: number): number => {
            if (typeof callback !== "function") {
                throw new Error("setInterval needs a callback function");
            }
            const id = nextId++;
            timers.set(id, {
                due: now + Math.max(0, Number(delay) || 0),
                period: Math.max(1, Number(delay) || 1),
                sequence: sequence++,
                callback,
                canceled: false,
            });
            return id;
        };
        const markCanceled = (id: number): void => {
            const entry = timers.get(id);
            if (entry !== undefined) {
                entry.canceled = true;
            }
        };
        // Fire every uncanceled timer whose deadline has been reached,
        // earliest deadline first (ties by insertion order). Repeating
        // entries stay live with their id and re-due by their period;
        // one-shot entries are removed as they fire. Only the interval
        // repeats here plus the single cancel timeout, but the drain
        // stays fully general so recursive-setTimeout submissions and
        // out-of-order scheduling are still pinned down deterministically.
        const flushThrough = (target: number): void => {
            for (;;) {
                let bestId: number | null = null;
                let bestEntry: IntervalTimerEntry | null = null;
                for (const [id, entry] of timers) {
                    if (entry.canceled || entry.due > target) continue;
                    if (
                        bestEntry === null ||
                        entry.due < bestEntry.due ||
                        (entry.due === bestEntry.due && entry.sequence < bestEntry.sequence)
                    ) {
                        bestId = id;
                        bestEntry = entry;
                    }
                }
                if (bestEntry === null) return;
                if (++this.steps > 100000) {
                    throw new Error("Virtual tick cap exceeded");
                }
                now = Math.max(now, bestEntry.due);
                if (bestEntry.period === null) {
                    timers.delete(bestId);
                } else {
                    bestEntry.due += bestEntry.period;
                }
                bestEntry.callback();
            }
        };

        try {
            globalObject.setTimeout = setTimeoutImpl;
            globalObject.clearTimeout = markCanceled;
            globalObject.setInterval = setIntervalImpl;
            globalObject.clearInterval = markCanceled;

            if (typeof this.fnSource !== "string") {
                throw new Error("case fn must be a function source string");
            }
            const compiled = new Function("return (" + this.fnSource + ");")() as (...inputs: any[]) => unknown;
            if (typeof compiled !== "function") {
                throw new Error("fn must evaluate to a function");
            }
            // The recorder IS the fn handed to cancellable(): the immediate
            // call made inside cancellable() lands while the clock still
            // reads 0, and only an execution that flows through a scheduled
            // timer reaches it afterwards, so every row below corresponds
            // to a real run of the protocol.
            const fn = (...inputs: any[]): unknown => {
                const returned = compiled(...inputs);
                this.events.push({ time: now, returned });
                return returned;
            };
            const cancelFn = cancellable(fn, [...this.args], this.t);
            if (typeof cancelFn !== "function") {
                throw new Error("cancellable must return a function");
            }
            setTimeout(cancelFn, this.cancelTimeMs);
            // Drain: keep firing until nothing live remains — a correct
            // submission stops its repeat chain when cancelFn clears it.
            // The cap keeps any runaway rescheduling honest anyway.
            for (;;) {
                let earliest: IntervalTimerEntry | null = null;
                for (const [, entry] of timers) {
                    if (entry.canceled) continue;
                    if (earliest === null || entry.due < earliest.due) {
                        earliest = entry;
                    }
                }
                if (earliest === null) break;
                flushThrough(earliest.due);
            }
        } finally {
            globalObject.setTimeout = realSetTimeout;
            globalObject.clearTimeout = realClearTimeout;
            globalObject.setInterval = realSetInterval;
            globalObject.clearInterval = realClearInterval;
        }
    }

    verdict(): { time: number; returned: unknown }[] {
        return this.events;
    }
}
