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

class ThrottleCase {
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (t, calls) plus the query budget (unused — replaying
    // a bounded script needs no call accounting).
    constructor([t, calls], budget) {
        void budget;
        this.t = t;
        this.calls = calls;
        this.events = [];
        this.steps = 0;
    }

    drive(throttle) {
        const globalObject = globalThis;
        const realSetTimeout = globalObject.setTimeout;
        const realClearTimeout = globalObject.clearTimeout;
        let now = 0;
        let sequence = 0;
        const timers = new Map(); // id -> {due, sequence, callback, canceled}
        let nextId = 1;

        const setTimeoutImpl = (callback, delay) => {
            if (typeof callback !== "function") {
                throw new Error("setTimeout needs a callback function");
            }
            const entry = {
                due: now + Math.max(0, Number(delay) || 0),
                sequence: sequence++,
                callback,
                canceled: false,
            };
            const id = nextId++;
            timers.set(id, entry);
            return id;
        };
        const clearTimeoutImpl = (id) => {
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
        const flushThrough = (target) => {
            for (;;) {
                let bestId = null;
                let bestEntry = null;
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

            const fn = (...inputs) => {
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
                let earliest = null;
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

    verdict() {
        return this.events;
    }
}
