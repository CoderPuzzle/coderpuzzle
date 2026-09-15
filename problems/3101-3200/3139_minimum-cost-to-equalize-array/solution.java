class Solution {

    public int minCostToEqualizeArray(int[] nums, int cost1, int cost2) {
        // Costs reach about 10**17 -- deficits up to 2*10**11 times prices
        // up to 10**6 -- so every running figure stays in a long. Each
        // candidate target admits at most min(total/2, total - peak) pair
        // ops, worth taking while cost2 < 2 * cost1; scanning targets up
        // to twice the maximum suffices because further steps only add
        // cost.
        final int MOD = 1000000007;
        long price1 = cost1;
        long price2 = cost2;
        int low = Integer.MAX_VALUE;
        int high = Integer.MIN_VALUE;
        for (int v : nums) {
            low = Math.min(low, v);
            high = Math.max(high, v);
        }
        long total = 0L;
        for (int v : nums) {
            total += high - v;
        }
        if (2L * price1 <= price2) {
            return (int) ((total * price1) % MOD);
        }
        long count = nums.length;
        long best = Long.MAX_VALUE;
        for (long target = high; target <= 2L * high; ++target) {
            long peak = target - low;
            long pair;
            long rest;
            if (2L * peak <= total) {
                pair = total / 2;
                rest = total % 2;
            } else {
                pair = total - peak;
                rest = 2L * peak - total;
            }
            long cost = pair * price2 + rest * price1;
            if (cost < best) {
                best = cost;
            }
            total += count;
        }
        return (int) (best % MOD);
    }
}
