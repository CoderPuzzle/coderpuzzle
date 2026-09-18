class RandomizedSet {
    constructor() {
        // Hash map from value -> index, plus a values array. remove
        // swaps the victim with the last element and pops, so
        // insert/remove/draw are all O(1); draw draws uniformly from
        // the live values.
        this.values = [];
        this.index = new Map();
    }

    insert(val) {
        if (this.index.has(val)) {
            return false;
        }
        this.index.set(val, this.values.length);
        this.values.push(val);
        return true;
    }

    remove(val) {
        const slot = this.index.get(val);
        if (slot === undefined) {
            return false;
        }
        this.index.delete(val);
        const last = this.values.length - 1;
        if (slot !== last) {
            const moved = this.values[last];
            this.values[slot] = moved;
            this.index.set(moved, slot);
        }
        this.values.pop();
        return true;
    }

    getRandom() {
        return this.values[Math.floor(Math.random() * this.values.length)];
    }
}
