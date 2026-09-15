class Solution {

    // Operations only peel elements off the ends, so what remains is a
    // contiguous block: 1 element when n is odd, 2 adjacent when n is
    // even. Every removed element scores exactly once, so maximize the
    // score by leaving the cheapest possible block behind.
    public long maxScore(int[] nums) {
        long total = 0;
        for (int v : nums) {
            total += v;
        }
        if (nums.length % 2 == 1) {
            long keep = nums[0];
            for (int v : nums) {
                if (v < keep) {
                    keep = v;
                }
            }
            return total - keep;
        }
        long keep = nums[0] + nums[1];
        for (int i = 0; i + 1 < nums.length; i++) {
            if (nums[i] + nums[i + 1] < keep) {
                keep = nums[i] + nums[i + 1];
            }
        }
        return total - keep;
    }
}
