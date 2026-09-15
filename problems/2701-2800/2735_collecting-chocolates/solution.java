class Solution {

    public long minCost(int[] nums, int x) {
        // Try every rotation count k in [0, n): after k operations, buying
        // type t costs nums[(t - k) mod n], so each step only adds one new
        // candidate price per type on top of the ones already seen.
        int n = nums.length;
        // cheapest[t] tracks the lowest price seen so far for type t; totals
        // reach about 2 * 10^12, so accumulate in long.
        long[] cheapest = new long[n];
        long answer = 0;
        for (int t = 0; t < n; ++t) {
            cheapest[t] = nums[t];
            answer += nums[t];
        }
        for (int rotations = 1; rotations < n; ++rotations) {
            long total = 0;
            for (int t = 0; t < n; ++t) {
                int price = nums[(t - rotations + n) % n];
                if (price < cheapest[t]) {
                    cheapest[t] = price;
                }
                total += cheapest[t];
            }
            answer = Math.min(answer, total + (long) rotations * x);
        }
        return answer;
    }
}
