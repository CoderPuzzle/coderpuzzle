class Solution {

    public int minMoves(int[] nums) {
        // Incrementing n - 1 elements is, in relative terms, decrementing the
        // one element left out: every pairwise gap moves exactly as it would
        // if that single element had dropped by 1. So the question becomes how
        // many unit decrements make all elements equal, and since decrements
        // never lift anything, the common target is the current minimum.
        long total = 0;
        int minimum = nums[0];
        for (int value : nums) {
            total += value;
            minimum = Math.min(minimum, value);
        }
        // The total spans n * |nums[i]|, up to 10^14 — far beyond int range —
        // so both terms meet as long; only their difference, the promised
        // 32-bit answer, comes back out.
        return (int) (total - (long) minimum * nums.length);
    }
}
