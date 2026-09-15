class SmallestInfiniteSet {
    // Everything below nextNew has been popped at least once; a removed
    // value is present again exactly when it sits in this set. Values
    // >= nextNew have never been touched.
    private nextNew: number = 1;
    private addedBack: Set<number> = new Set();

    constructor() {}

    popSmallest(): number {
        if (this.addedBack.size > 0) {
            let value = Infinity;
            for (const candidate of this.addedBack) {
                value = Math.min(value, candidate);
            }
            this.addedBack.delete(value);
            return value;
        }
        return this.nextNew++;
    }

    addBack(num: number): void {
        // Only values already popped can be added back.
        if (num < this.nextNew) {
            this.addedBack.add(num);
        }
    }
}
