class MyCalendarThree {
    // Per-instant change in the number of live intervals: +1 where one
    // opens, -1 where one closes.
    constructor() {
        this.delta = new Map();
    }

    book(start, end) {
        this.delta.set(start, (this.delta.get(start) || 0) + 1);
        this.delta.set(end, (this.delta.get(end) || 0) - 1);
        let best = 0;
        let active = 0;
        // Sweep boundaries in time order; the running sum is the number of
        // events active at that moment, so its peak is the deepest overlap
        // seen. Changes at one instant merge, so an interval closing where
        // another opens is never counted twice.
        for (const time of [...this.delta.keys()].sort((a, b) => a - b)) {
            active += this.delta.get(time);
            if (active > best) {
                best = active;
            }
        }
        return best;
    }
}
