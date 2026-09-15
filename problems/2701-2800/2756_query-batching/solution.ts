class QueryBatcher {
    private queryMultiple: QueryMultiple;
    private t: number;
    private clock: VirtualClock;
    // Time of the most recent queryMultiple call (null before the
    // first); the throttle window is anchored here, per call.
    private lastQueryTime: number | null = null;
    private pendingKeys: string[] = [];
    private pendingResolvers: ((value: string) => void)[] = [];
    private flushTimerSet = false;

    constructor(queryMultiple: QueryMultiple, t: number, clock: VirtualClock) {
        this.queryMultiple = queryMultiple;
        this.t = t;
        this.clock = clock;
    }

    async getValue(key: string): Promise<string> {
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

    private flushPending(): void {
        this.flushTimerSet = false;
        if (this.pendingKeys.length === 0) return;
        const keys = this.pendingKeys.splice(0);
        const resolvers = this.pendingResolvers.splice(0);
        this.dispatch(keys, resolvers);
    }

    private dispatch(keys: string[], resolvers: ((value: string) => void)[]): void {
        this.lastQueryTime = this.clock.now();
        this.queryMultiple(keys).then((values) => {
            values.forEach((value, index) => resolvers[index](value));
        });
    }
}

class Solution {
    run(driver: BatchingDriver): void {
        const batcher = new QueryBatcher(driver.queryMultiple, driver.t, driver.clock);
        driver.drive(batcher);
    }
}
