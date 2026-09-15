class Solution {

    public int minimumK(int[] nums) {
        // An element v needs ceil(v / k) reduce-by-k operations, so
        // nonPositive(nums, k) is the sum of those ceilings. Feasibility
        // is monotone in k: every ceiling only shrinks as k grows while
        // k * k strictly grows, so binary search finds the smallest
        // feasible k.
        int max = 0;
        for (int value : nums) max = Math.max(max, value);
        // Warm-up: once k >= max every ceiling is exactly 1, so
        // nonPositive(nums, k) == n there; doubling max until feasible
        // stops at the first power-of-two multiple with k * k >= n.
        long hi = max;
        while (!feasible(nums, hi)) hi *= 2;
        long lo = 1;
        while (lo < hi) {
            long mid = (lo + hi) >>> 1;
            if (feasible(nums, mid)) hi = mid;
            else lo = mid + 1;
        }
        return (int) lo;
    }

    // Totals reach 1e5 * 1e5 = 1e10 and squares of k reach 1e10 as well,
    // beyond int, so the running sum and the square are longs.
    private boolean feasible(int[] nums, long k) {
        long total = 0;
        for (int value : nums) total += (value + k - 1) / k;
        return total <= k * k;
    }
}
