class Allocator {
    // Flat cell array holding each unit's mID (0 = free). allocate
    // linear-scans runs of free cells for the leftmost fit; freeMemory
    // sweeps the same array once, zeroing every match.
    private units: number[];

    constructor(n: number) {
        this.units = new Array(n).fill(0);
    }

    allocate(size: number, mID: number): number {
        let i = 0;
        while (i < this.units.length) {
            if (this.units[i] === 0) {
                let j = i;
                while (j < this.units.length && this.units[j] === 0) ++j;
                if (j - i >= size) {
                    for (let k = i; k < i + size; ++k) this.units[k] = mID;
                    return i;
                }
                i = j;
            } else {
                ++i;
            }
        }
        return -1;
    }

    freeMemory(mID: number): number {
        let freed = 0;
        for (let k = 0; k < this.units.length; ++k) {
            if (this.units[k] === mID) {
                this.units[k] = 0;
                ++freed;
            }
        }
        return freed;
    }
}
