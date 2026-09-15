// Hash multiset: value -> occurrence count. add bumps a counter in O(1);
// find lazily scans the distinct values once, asking for each complement.
class TwoSum {
    constructor() {
        this.counts = new Map();
    }

    add(number) {
        this.counts.set(number, (this.counts.get(number) || 0) + 1);
    }

    find(value) {
        for (const [number, count] of this.counts) {
            const complement = value - number;
            // A value that is its own complement needs two stored copies.
            if (this.counts.has(complement) && (complement !== number || count > 1)) return true;
        }
        return false;
    }
}
