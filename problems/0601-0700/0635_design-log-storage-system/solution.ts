// Logs kept as parallel id/timestamp arrays in put order; retrieve truncates
// every string to the granularity's fixed-width prefix and keeps the logs
// whose truncated timestamp compares between the truncated bounds —
// zero-padded fields make that exact.

// Prefix length per granularity: "2017" for Year, one more ":XX" field per
// step down to the full 19 characters.
const granularityWidth: Record<string, number> = {
    Year: 4,
    Month: 7,
    Day: 10,
    Hour: 13,
    Minute: 16,
    Second: 19,
};

class LogSystem {
    private ids: number[] = [];
    private timestamps: string[] = [];

    constructor() {}

    put(id: number, timestamp: string): void {
        this.ids.push(id);
        this.timestamps.push(timestamp);
    }

    retrieve(start: string, end: string, granularity: string): number[] {
        const width = granularityWidth[granularity];
        const low = start.slice(0, width);
        const high = end.slice(0, width);
        // The scan walks the store oldest-first, so the ids come back in
        // the order their logs were stored.
        const found: number[] = [];
        for (let index = 0; index < this.timestamps.length; ++index) {
            // Same-width truncations compare exactly like their fields.
            const truncated = this.timestamps[index].slice(0, width);
            if (low <= truncated && truncated <= high) {
                found.push(this.ids[index]);
            }
        }
        return found;
    }
}
