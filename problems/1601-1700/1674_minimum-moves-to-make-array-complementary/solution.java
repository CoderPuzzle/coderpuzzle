class Solution {

    public int minMoves(int[] nums, int limit) {
        int n = nums.length;
        // Difference array over candidate target sums t in [2, 2*limit]:
        // each mirror pair's cost curve becomes range updates.
        int[] diff = new int[2 * limit + 2];
        for (int i = 0; i < n / 2; i++) {
            int a = nums[i],
                b = nums[n - 1 - i];
            int lo = Math.min(a, b),
                hi = Math.max(a, b);
            // Base cost 2 everywhere; −1 across [lo+1, hi+limit], the sums
            // one changed element can reach; a further −1 exactly at
            // t = a + b, where no change is needed.
            diff[2] += 2;
            diff[lo + 1] -= 1;
            diff[a + b] -= 1;
            diff[a + b + 1] += 1;
            diff[hi + limit + 1] += 1;
        }
        // Prefix sums give the total cost per target; keep the minimum.
        int best = Integer.MAX_VALUE;
        int cur = 0;
        for (int target = 2; target <= 2 * limit; target++) {
            cur += diff[target];
            if (cur < best) best = cur;
        }
        return best;
    }
}
