// bundle-provided driver for 2805 custom-interval. Assembled into
// every submission by the judge ahead of the submitted code; never
// editable in the editor. This file is the hidden implementation —
// solvers see only the public API documented in the statement.
//
// Judging runs on a deterministic virtual clock, so real time and real
// timers have no influence on what is judged. drive() swaps the global
// setTimeout/clearTimeout for virtual-clock equivalents, supplies its
// own recording fn (every actual execution appends the virtual execution
// time to the transcript), invokes the submission's customInterval(fn,
// delay, period) exactly once, schedules customClearInterval(id) at the
// case's cancelTimeMs through the same patched clock, and then drains
// every scheduled timer to completion — earliest deadline first, ties
// broken by scheduling order, which is exactly how Node drains its timer
// phase. The interval's first timer registers before the cancel timeout;
// ticks re-scheduled from inside earlier callbacks register later, so a
// re-scheduled tick landing exactly on cancelTimeMs loses that tie and is
// cleared unrecorded. The clock pins to each fired deadline itself, so
// rows record their own instant; verdict() returns the recorded times in
// execution order.

class CustomIntervalCase {
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (delay, period, cancelTimeMs) plus the query budget
    // (unused — replaying a bounded growing-interval script needs no
    // accounting).
    constructor([delay, period, cancelTimeMs], budget) {
        void budget;
        this.delay = delay;
        this.period = period;
        this.cancelTimeMs = cancelTimeMs;
        this.events = [];
        this.steps = 0;
    }

    drive(customInterval, customClearInterval) {
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
        // earliest deadline first (ties by insertion order). Ticks of a
        // linear pattern re-register fresh one-shot timers from inside
        // their callbacks; the drain stays fully general so such chains
        // are replayed deterministically no matter how the submission
        // organizes them.
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

            if (typeof customInterval !== "function") {
                throw new Error("customInterval must be a function");
            }
            if (typeof customClearInterval !== "function") {
                throw new Error("customClearInterval must be a function");
            }
            // The recorder IS the fn handed to customInterval(): only an
            // execution that flows through a scheduled timer reaches it,
            // so every row below corresponds to a real delayed run.
            const fn = () => {
                this.events.push(now);
            };
            const id = customInterval(fn, this.delay, this.period);
            setTimeout(() => customClearInterval(id), this.cancelTimeMs);
            // Drain: run every surviving timer to completion. Growing gaps
            // make a runaway chain impossible, but the tick cap keeps any
            // rescheduling storm honest anyway.
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
