// Problem-provided driver for 2756 query-batching. Assembled into every
// submission by the judge ahead of the submitted code; never editable in
// the editor. This file is the hidden implementation — solvers see only
// the public API documented in the statement.
//
// The whole timeline runs on a deterministic virtual clock: timers fire in
// (due time, scheduling order), the cascade is fully synchronous, and
// resolution times are recorded at the exact virtual instant each batch's
// delay elapses. Real time, real timers and microtask scheduling have no
// influence on what is judged.

class VirtualClock {
    constructor() {
        this.currentTime = 0;
        this.sequence = 0;
        this.timers = [];
    }

    now() {
        return this.currentTime;
    }

    setTimeout(callback, delay) {
        const timer = {
            time: this.currentTime + Math.max(0, delay),
            sequence: this.sequence++,
            callback,
        };
        const position = this.timers.findIndex(
            (scheduled) =>
                scheduled.time > timer.time || (scheduled.time === timer.time && scheduled.sequence > timer.sequence),
        );
        if (position === -1) {
            this.timers.push(timer);
        } else {
            this.timers.splice(position, 0, timer);
        }
        return timer;
    }

    // Fire every due timer until none remain. The queue can only shrink
    // when nothing new is scheduled, so termination needs no clock jump;
    // the cap merely turns a runaway submission into a runtime error.
    run(cap = 100000) {
        let fired = 0;
        while (this.timers.length > 0) {
            if (++fired > cap) {
                throw new Error("Virtual clock event cap exceeded");
            }
            const timer = this.timers.shift();
            this.currentTime = timer.time;
            timer.callback();
        }
    }
}

class BatchingDriver {
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (qm spec, throttle t, timeline calls) plus the query
    // budget (unused here — the driver schedules a bounded number of events
    // by construction).
    constructor([qm, t, calls], budget) {
        void budget;
        this.clock = new VirtualClock();
        this.t = t;
        this.calls = calls;
        this.log = [];
        const clock = this.clock;
        const delayFor = (keys) => {
            if (qm.mode === "constant") return qm.delay;
            if (qm.mode === "per_key") return qm.delay * keys.length;
            return 0;
        };
        // The asynchronous function under test: resolves with key + "!" per
        // key once its delay elapses on the virtual clock. Each resolution
        // is logged at that exact instant, in keys order — which is also
        // the moment every getValue promise for the batch observable
        // resolves (microtask propagation costs zero virtual ms).
        this.queryMultiple = (keys) => {
            const values = keys.map((key) => key + "!");
            return new Promise((resolve) => {
                clock.setTimeout(() => {
                    const time = clock.now();
                    for (const value of values) {
                        this.log.push({ resolved: value, time });
                    }
                    resolve(values);
                }, delayFor(keys));
            });
        };
    }

    // Schedule the case's getValue calls at their scripted times (up front,
    // so same-tick calls keep their timeline order) and run to completion.
    drive(batcher) {
        for (const call of this.calls) {
            this.clock.setTimeout(() => {
                batcher.getValue(call.key);
            }, call.time);
        }
        this.clock.run();
    }

    verdict() {
        return this.log;
    }
}
