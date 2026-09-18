class Solution {
    private positions: Map<number, number[]>;

    constructor(nums: number[]) {
        // One pass buckets the indices of every value; drawIndex(target)
        // draws one of that value's index buckets uniformly, so each
        // qualifying index is exactly equally likely.
        this.positions = new Map();
        nums.forEach((value, index) => {
            const bucket = this.positions.get(value);
            if (bucket) {
                bucket.push(index);
            } else {
                this.positions.set(value, [index]);
            }
        });
    }

    pick(target: number): number {
        const indices = this.positions.get(target)!;
        return indices[Math.floor(Math.random() * indices.length)];
    }
}
