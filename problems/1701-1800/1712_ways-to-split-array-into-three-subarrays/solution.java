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
        // prefix is non-decreasing, so for a fixed left cut the legal
        // second cuts form one contiguous range — delimit it with two
        // binary searches.
        for (int i = 1; i < n - 1; i++) {
            long left = prefix[i];
            // left <= mid becomes prefix[j] >= 2 * left: first legal j.
            int lo = lowerBound(prefix, i + 1, n, 2 * left);
            if (lo >= n) {
                continue;
            }
            // mid <= right becomes prefix[j] <= (total + left) / 2 — the
            // floor is exact because the bound is an integer inequality.
            int hi = upperBound(prefix, lo, n, (total + left) / 2);
            if (hi > lo) {
                answer = (answer + hi - lo) % MOD;
            }
        }
        return (int) answer;
    }

    private int lowerBound(long[] a, int lo, int hi, long value) {
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (a[mid] < value) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    private int upperBound(long[] a, int lo, int hi, long value) {
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (a[mid] <= value) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
