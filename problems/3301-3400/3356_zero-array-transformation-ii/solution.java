class Solution {

    public int minZeroArray(int[] nums, int[][] queries) {
        // After the first k queries an index can reach zero exactly when
        // the total val of the queries covering it is at least nums[i] —
        // each index can spend every covering query's allowance
        // independently, and extra queries never hurt, so feasibility is
        // monotone in k. Binary search k; each probe folds the first k
        // queries into a difference array and checks one prefix sweep,
        // O(n + q). Coverage sums are bounded by q * val <= 5 * 10^5, well
        // inside int.
        int n = nums.length;
        int lo = 0;
        int hi = queries.length;
        if (!feasible(nums, queries, hi)) {
            return -1;
        }
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (feasible(nums, queries, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private boolean feasible(int[] nums, int[][] queries, int k) {
        int n = nums.length;
        int[] delta = new int[n + 1];
        for (int j = 0; j < k; j++) {
            delta[queries[j][0]] += queries[j][2];
            delta[queries[j][1] + 1] -= queries[j][2];
        }
        int cover = 0;
        for (int i = 0; i < n; i++) {
            cover += delta[i];
            if (cover < nums[i]) {
                return false;
            }
        }
        return true;
    }
}
