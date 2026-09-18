class UndergroundSystem {
    constructor() {
        this.checkins = new Map();
        this.totals = new Map();
    }

    checkIn(id, stop, t) {
        this.checkins.set(id, { stop, t });
    }

    checkOut(id, stop, t) {
        const { stop: start, t: started } = this.checkins.get(id);
        this.checkins.delete(id);
        let byEnd = this.totals.get(start);
        if (!byEnd) {
            byEnd = new Map();
            this.totals.set(start, byEnd);
        }
        let bucket = byEnd.get(stop);
        if (!bucket) {
            bucket = [0, 0];
            byEnd.set(stop, bucket);
        }
        bucket[0] += t - started;
        bucket[1] += 1;
    }

    getAverageTime(fromStop, toStop) {
        const [total, count] = this.totals.get(fromStop).get(toStop);
        return total / count;
    }
}
