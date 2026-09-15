class NumArray {

    // prefix[i] = sum of the first i elements, prefix[0] = 0; held in
    // long so the 10^9 worst-case total stays comfortably safe.
    private final long[] prefix;

    public NumArray(int[] nums) {
        this.prefix = new long[nums.length + 1];
        // One left-to-right pass; each entry extends the previous by
        // one element. The array is fixed, so summing happens once,
        // not per query.
        for (int index = 0; index < nums.length; index++) {
            prefix[index + 1] = prefix[index] + nums[index];
        }
    }

    public long sumRange(int left, int right) {
        // The elements before left cancel, telescoping the range sum
        // into a difference of two prefixes — O(1) per query.
        return prefix[right + 1] - prefix[left];
    }
}
