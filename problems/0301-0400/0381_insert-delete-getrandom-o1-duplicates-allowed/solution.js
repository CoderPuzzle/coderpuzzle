// Hash map from value -> sorted list of indices, plus a values array.
// Deterministic variant: remove deletes the leftmost occurrence and moves
// the last element into the vacated slot; draw returns values[0].
class RandomizedCollection {
    constructor() {
        this.values = [];
        this.indices = new Map();
    }

    // Leftmost insertion point for target in a sorted list.
    bisect(list, target) {
        let low = 0;
        let high = list.length;
        while (low < high) {
            const mid = (low + high) >> 1;
            if (list[mid] < target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }

    insert(val) {
        const positions = this.indices.get(val);
        const present = positions !== undefined;
        this.values.push(val);
        const index = this.values.length - 1; // new index is always the maximum
        if (present) {
            positions.splice(this.bisect(positions, index), 0, index);
        } else {
            this.indices.set(val, [index]);
        }
        return !present;
    }

    remove(val) {
        const positions = this.indices.get(val);
        if (positions === undefined || positions.length === 0) {
            return false;
        }
        const index = positions[0]; // leftmost occurrence
        const last = this.values.length - 1;
        if (this.values[last] === val) {
            // The moved element equals the removed one: a copy stays at
            // `index`, so only the last index leaves the set.
            positions.splice(this.bisect(positions, last), 1);
        } else {
            const moved = this.values[last];
            this.values[index] = moved;
            const others = this.indices.get(moved);
            others.splice(this.bisect(others, last), 1);
            others.splice(this.bisect(others, index), 0, index);
            positions.shift();
        }
        this.values.pop();
        if (positions.length === 0) {
            this.indices.delete(val);
        }
        return true;
    }

    getRandom() {
        return this.values[0];
    }
}
