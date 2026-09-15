// bundle-provided driver for 2715 timeout-cancellation. Assembled into
// every submission by the judge ahead of the submitted code; never
// editable in the editor. This file is the hidden implementation —
// solvers see only the public API documented in the statement.
//
// Judging runs on a deterministic virtual clock, so real time and real
// timers have no influence on what is judged. drive() swaps the global
// setTimeout/clearTimeout for virtual-clock equivalents, builds a
// recorder fn from the case's fn source (every actual execution evaluates
// it over the case args and records one transcript row {time, returned}),
// hands fn/args/t to the submission's cancellable(), schedules the
// returned cancelFn at the case's cancelTimeMs, and then drains every
// scheduled timer to completion — earliest deadline first, ties broken by
// scheduling order, which is exactly how Node drains its timer phase.
// The clock pins to each fired deadline itself, so rows record their own
// instant; verdict() returns the rows in execution order.

class TimeoutCase {
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (fn, args, t, cancelTimeMs) plus the query budget
    // (unused — replaying a bounded two-timer script needs no accounting).
    constructor([fn, args, t, cancelTimeMs], budget) {
        void budget;
        this.fnSource = fn;
        this.args = args;
        this.t = t;
        this.cancelTimeMs = cancelTimeMs;
        this.events = [];
        this.steps = 0;
    }

    drive(cancellable) {
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
        // Fire every uncanceled timer whose deadline has been reached,
        // earliest deadline first (ties by insertion order). Only two
        // timers ever exist here — the delayed execution and the cancel —
        // but the drain stays fully general so out-of-order scheduling by
        // exotic submissions is still pinned down deterministically.
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

            if (typeof this.fnSource !== "string") {
                throw new Error("case fn must be a function source string");
            }
            const compiled = new Function("return (" + this.fnSource + ");")();
            if (typeof compiled !== "function") {
                throw new Error("fn must evaluate to a function");
            }
            // The recorder IS the fn handed to cancellable(): only an
            // execution that flows through a scheduled timer reaches it,
            // so every row below corresponds to a real delayed run.
            const fn = (...inputs) => {
                const returned = compiled(...inputs);
                this.events.push({ time: now, returned });
                return returned;
            };
            const cancelFn = cancellable(fn, [...this.args], this.t);
            if (typeof cancelFn !== "function") {
                throw new Error("cancellable must return a function");
            }
            setTimeout(cancelFn, this.cancelTimeMs);
            // Drain: run every surviving timer to completion. With no
            // rescheduling expected, at most two firings occur; the cap
            // keeps any runaway rescheduling honest anyway.
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
