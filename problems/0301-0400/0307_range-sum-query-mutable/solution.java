class NumArray {

    private final int n;
    private final int[] nums;
    private final long[] tree;

    public NumArray(int[] nums) {
        this.n = nums.length;
        this.nums = nums.clone();
        // Fenwick tree, 1-based: slot i holds the sum of the block of length
        // i & -i ending at i. Slot 0 stays unused so low-bit walks terminate.
        this.tree = new long[n + 1];
        // O(n) build: once a block sum is finished, push it straight into
        // its parent's slot — one pass instead of n updates.
        for (int index = 1; index <= n; index++) {
            tree[index] += this.nums[index - 1];
            int parent = index + (index & -index);
            if (parent <= n) {
                tree[parent] += tree[index];
            }
        }
    }

    public void update(int index, int val) {
        // Only the delta is applied; nums keeps current values so the next
        // delta is computed correctly.
        int delta = val - nums[index];
        nums[index] = val;
        // Climb by the low bit to visit every block containing this cell.
        for (int position = index + 1; position <= n; position += position & -position) {
            tree[position] += delta;
        }
    }

    public long sumRange(int left, int right) {
        // A range sum is the difference of two prefix sums.
        return prefix(right + 1) - prefix(left);
    }

    private long prefix(int count) {
        long total = 0;
        // Each step lands on a disjoint block whose union is exactly the
        // first `count` elements — O(log n) of them.
        while (count > 0) {
            total += tree[count];
            count -= count & -count;
        }
        return total;
    }
}
