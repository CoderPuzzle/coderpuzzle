class Solution {

    public int combinationSum4(int[] nums, int target) {
        // Order matters, so the table is indexed by the total alone: each
        // sequence reaching t is identified by its last element, making
        // ways[t] the sum of ways[t - x] over every final pick x <= t.
        // long accumulation keeps the running counts safe before the
        // answer lands back inside the promised 32-bit range.
        long[] ways = new long[target + 1];
        ways[0] = 1; // the empty sequence: exactly one way to build 0
        for (int t = 1; t <= target; ++t) {
            for (int x : nums) {
                if (x <= t) ways[t] += ways[t - x];
            }
        }
        return (int) ways[target];
    }
}
