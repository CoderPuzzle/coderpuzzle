class Solution {

    public int waysToSplit(int[] nums) {
        final int MOD = 1000000007;
        int n = nums.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        long total = prefix[n];
        long answer = 0;
        // Both cut bounds move monotonically with the first cut, so two
        // pointers that only ever advance replace the repeated searches.
        int lo = 2;
        int hi = 2;
        for (int i = 1; i < n - 1; i++) {
            long left = prefix[i];
            if (lo < i + 1) {
                lo = i + 1;
            }
            // left <= mid becomes prefix[j] >= 2 * left: skip the entries
            // that leave the middle block too small.
            while (lo < n && prefix[lo] < 2 * left) {
                lo++;
            }
            if (lo >= n) {
                continue;
            }
            // mid <= right becomes prefix[j] <= (total + left) / 2 — the
            // floor is exact because the bound is an integer inequality.
            if (hi < lo) {
                hi = lo;
            }
            while (hi < n && prefix[hi] <= (total + left) / 2) {
                hi++;
            }
            if (hi > lo) {
                answer = (answer + hi - lo) % MOD;
            }
        }
        return (int) answer;
    }
}
