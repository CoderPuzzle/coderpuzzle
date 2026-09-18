class SnapshotArray {
    private current = 0; // version id the next commit() will return
    private history = new Map<number, [number, number][]>(); // index -> [commitId, val]

    constructor(length: number) {}

    set(index: number, val: number): void {
        let entries = this.history.get(index);
        if (entries === undefined) {
            entries = [];
            this.history.set(index, entries);
        }
        const last = entries[entries.length - 1];
        if (last !== undefined && last[0] === this.current) {
            last[1] = val; // a second write in the same version
        } else {
            entries.push([this.current, val]);
        }
    }

    snap(): number {
        return this.current++;
    }

    get(index: number, commit_id: number): number {
        const entries = this.history.get(index);
        if (entries === undefined) {
            return 0; // never written
        }
        let low = 0;
        let high = entries.length;
        while (low < high) {
            // rightmost entry at or before commit_id
            const mid = (low + high) >>> 1;
            if (entries[mid][0] <= commit_id) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low === 0 ? 0 : entries[low - 1][1];
    }
}
