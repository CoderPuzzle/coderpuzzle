// bundle-provided driver for 2676 throttle. Assembled into every submission
// by the judge ahead of the submitted code; never editable in the editor.
// This file is the hidden implementation — solvers see only the public API
// documented in the statement.
//
// Judging runs on a deterministic virtual clock, so real time and real
// timers have no influence on what is judged. drive() swaps the global
// setTimeout/clearTimeout for virtual-clock equivalents, replays the
// case's calls at their recorded times in order (a call arriving before
// the clock clamps: the clock only ever moves forward), and flushes every
// timer whose deadline has been reached BEFORE a call at the same instant
// proceeds — earlier deadlines first, ties broken by scheduling order,
// which is exactly how Node drains its timer phase. After the last call,
// every surviving timer runs to completion. Each actual execution of the
// wrapped function records one transcript row {t, inputs}; verdict()
// returns those rows in execution order.

// Ambient node globals for the assembled environment (the compile runs
// without DOM/node libs); both this driver and the submission's typed
// code may call setTimeout/clearTimeout idiomatically.
declare function setTimeout(callback: (...args: any[]) => void, delay?: number): number;
declare function clearTimeout(handle: number | undefined): void;

interface TimerEntry {
    due: number;
    sequence: number;
    callback: () => void;
    canceled: boolean;
}

class ThrottleCase {
    t: number;
    calls: { t: number; inputs: any[] }[];
    events: { t: number; inputs: any[] }[];
    steps = 0;

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (t, calls) plus the query budget (unused — replaying
    // a bounded script needs no call accounting).
    constructor(values: any[], _queryBudget?: unknown) {
        const [t, calls] = values;
        this.t = t;
        this.calls = calls;
        this.events = [];
    }

    drive(throttle: (fn: (...inputs: any[]) => void, t: number) => (...args: any[]) => void): void {
        const globalObject = globalThis as any;
        const realSetTimeout = globalObject.setTimeout;
        const realClearTimeout = globalObject.clearTimeout;
        let now = 0;
        let sequence = 0;
        let nextId = 1;
        const timers = new Map<number, TimerEntry>(); // id -> entry

        const setTimeoutImpl = (callback: () => void, delay: number): number => {
            if (typeof callback !== "function") {
                throw new Error("setTimeout needs a callback function");
            }
            const entry: TimerEntry = {
                due: now + Math.max(0, Number(delay) || 0),
                sequence: sequence++,
                callback,
                canceled: false,
            };
            const id = nextId++;
            timers.set(id, entry);
            return id;
        };
        const clearTimeoutImpl = (id: number): void => {
            const entry = timers.get(id);
            if (entry !== undefined) {
                entry.canceled = true;
            }
        };
        // Fire every uncanceled timer whose deadline is at or before
        // target, earliest deadline first (ties by insertion order). The
        // clock pins to each fired deadline itself, so executions record
        // their own instant rather than the arrival time of whatever call
        // happened to follow.
        const flushThrough = (target: number): void => {
            for (;;) {
                let bestId: number | null = null;
                let bestEntry: TimerEntry | null = null;
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
                timers.delete(bestId);
                now = Math.max(now, bestEntry.due);
                bestEntry.callback();
            }
        };

        try {
            globalObject.setTimeout = setTimeoutImpl;
            globalObject.clearTimeout = clearTimeoutImpl;

            const fn = (...inputs: any[]): void => {
                this.events.push({ t: now, inputs });
            };
            const throttled = throttle(fn, this.t);
            if (typeof throttled !== "function") {
                throw new Error("throttle must return a function");
            }
            for (const call of this.calls) {
                const instant = Math.max(now, call.t);
                flushThrough(instant);
                now = instant;
                if (++this.steps > 100000) {
                    throw new Error("Virtual tick cap exceeded");
                }
                throttled(...call.inputs);
            }
            // Drain: run every surviving timer to completion; a correct
            // throttle keeps at most one pending window at any moment, but
            // the cap keeps any runaway rescheduling honest anyway.
            for (;;) {
                let earliest: TimerEntry | null = null;
                for (const [, entry] of timers) {
                    if (entry.canceled) continue;
                    if (earliest === null || entry.due < earliest.due) {
                        earliest = entry;
                    }
                }
                if (earliest === null) break;
                if (++this.steps > 100000) {
                    throw new Error("Virtual tick cap exceeded");
                }
                flushThrough(earliest.due);
            }
        } finally {
            globalObject.setTimeout = realSetTimeout;
            globalObject.clearTimeout = realClearTimeout;
        }
    }

    verdict(): { t: number; inputs: any[] }[] {
        return this.events;
    }
}
