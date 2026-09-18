class NumArray {
    private n: number;
    private nums: number[];
    // Fenwick tree, 1-based: slot i holds the sum of the block of
    // length i & -i ending at i. Slot 0 stays unused so low-bit
    // walks terminate.
    private tree: number[];

    constructor(nums: number[]) {
        this.n = nums.length;
        this.nums = nums.slice();
        this.tree = new Array(this.n + 1).fill(0);
        // O(n) build: once a block sum is finished, push it straight
        // into its parent's slot — one pass instead of n updates.
        for (let index = 1; index <= this.n; index++) {
            this.tree[index] += this.nums[index - 1];
            const parent = index + (index & -index);
            if (parent <= this.n) {
                this.tree[parent] += this.tree[index];
            }
        }
    }

    update(index: number, value: number): void {
        // Only the delta is applied; nums keeps current values so the
        // next delta is computed correctly.
        const delta = value - this.nums[index];
        this.nums[index] = value;
        // Climb by the low bit to visit every block containing this cell.
        for (let position = index + 1; position <= this.n; position += position & -position) {
            this.tree[position] += delta;
        }
    }

    sumRange(left: number, right: number): number {
        // A range sum is the difference of two prefix sums.
        return this.prefix(right + 1) - this.prefix(left);
    }

    private prefix(count: number): number {
        let total = 0;
        // Each step lands on a disjoint block whose union is exactly
        // the first `count` elements — O(log n) of them.
        while (count > 0) {
            total += this.tree[count];
            count -= count & -count;
        }
        return total;
    }
}
