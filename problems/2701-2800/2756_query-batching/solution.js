class QueryBatcher {
    constructor(queryMultiple, t, clock) {
        this.queryMultiple = queryMultiple;
        this.t = t;
        this.clock = clock;
        // Time of the most recent queryMultiple call (null before the
        // first); the throttle window is anchored here, per call.
        this.lastQueryTime = null;
        this.pendingKeys = [];
        this.pendingResolvers = [];
        this.flushTimerSet = false;
    }

    async getValue(key) {
        return new Promise((resolve) => {
            if (this.lastQueryTime === null || this.clock.now() - this.lastQueryTime >= this.t) {
                this.dispatch([key], [resolve]);
                return;
            }
            this.pendingKeys.push(key);
            this.pendingResolvers.push(resolve);
            if (!this.flushTimerSet) {
                this.flushTimerSet = true;
                // One timer, pinned to the absolute window end C + t — not
                // t from now — so late arrivals inside the window join the
                // same pending batch instead of pushing the flush out.
                this.clock.setTimeout(
                    () => {
                        this.flushPending();
                    },
                    this.lastQueryTime + this.t - this.clock.now(),
                );
            }
        });
    }

    flushPending() {
        this.flushTimerSet = false;
        if (this.pendingKeys.length === 0) return;
        const keys = this.pendingKeys.splice(0);
        const resolvers = this.pendingResolvers.splice(0);
        this.dispatch(keys, resolvers);
    }

    dispatch(keys, resolvers) {
        this.lastQueryTime = this.clock.now();
        this.queryMultiple(keys).then((values) => {
            values.forEach((value, index) => resolvers[index](value));
        });
    }
}

class Solution {
    run(driver) {
        const batcher = new QueryBatcher(driver.queryMultiple, driver.t, driver.clock);
        driver.drive(batcher);
    }
}
