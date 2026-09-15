class Solution {

    public long maxScore(int[] nums, int x) {
        final long unseen = -(1L << 60);
        long[] best = { unseen, unseen };
        best[nums[0] % 2] = nums[0];

        for (int index = 1; index < nums.length; ++index) {
            int parity = nums[index] % 2;
            long extended = best[parity] + nums[index];
            long switched = best[parity ^ 1] + nums[index] - x;
            best[parity] = Math.max(extended, switched);
        }
        return Math.max(best[0], best[1]);
    }
}
