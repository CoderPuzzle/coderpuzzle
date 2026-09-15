class SmallestInfiniteSet {
    constructor() {
        // Everything below nextNew has been popped at least once; a
        // removed value is present again exactly when it sits in this
        // set. Values >= nextNew have never been touched.
        this.nextNew = 1;
        this.addedBack = new Set();
    }

    popSmallest() {
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

    addBack(num) {
        // Only values already popped can be added back.
        if (num < this.nextNew) {
            this.addedBack.add(num);
        }
    }
}
