class TimeMap {
    private values: Map<string, string[]>;
    private stamps: Map<string, number[]>;

    constructor() {
        this.values = new Map();
        this.stamps = new Map();
    }

    set(key: string, value: string, timestamp: number): void {
        let values = this.values.get(key);
        if (!values) {
            values = [];
            this.values.set(key, values);
        }
        values.push(value);
        let stamps = this.stamps.get(key);
        if (!stamps) {
            stamps = [];
            this.stamps.set(key, stamps);
        }
        stamps.push(timestamp);
    }

    get(key: string, timestamp: number): string {
        const stamps = this.stamps.get(key);
        if (!stamps) {
            return "";
        }
        let low = 0;
        let high = stamps.length;
        while (low < high) {
            const mid = (low + high) >>> 1;
            if (stamps[mid] <= timestamp) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        const index = low - 1;
        return index < 0 ? "" : this.values.get(key)![index];
    }
}
