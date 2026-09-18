class UndergroundSystem {
    private checkins: Map<number, { stop: string; t: number }>;
    private totals: Map<string, Map<string, number[]>>;

    constructor() {
        this.checkins = new Map();
        this.totals = new Map();
    }

    checkIn(id: number, stop: string, t: number): void {
        this.checkins.set(id, { stop, t });
    }

    checkOut(id: number, stop: string, t: number): void {
        const { stop: start, t: started } = this.checkins.get(id)!;
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

    getAverageTime(fromStop: string, toStop: string): number {
        const [total, count] = this.totals.get(fromStop)!.get(toStop)!;
        return total / count;
    }
}
