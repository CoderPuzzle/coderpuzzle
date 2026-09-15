class Solution {

    public long[] countStableSubarrays(int[] nums, int[][] queries) {
        int n = nums.length;
        // left[i] is the smallest start s such that nums[s..i] reads
        // non-decreasing; it only ever moves right, which the per-query
        // binary search below relies on.
        int[] left = new int[n];
        long[] prefLeft = new long[n + 1];
        long[] prefBase = new long[n + 1];
        for (int i = 0; i < n; i++) {
            left[i] = i > 0 && nums[i] >= nums[i - 1] ? left[i - 1] : i;
            // Stable subarrays ending at i inside their own run.
            prefLeft[i + 1] = prefLeft[i] + left[i];
            prefBase[i + 1] = prefBase[i] + (i - left[i] + 1);
        }
        long[] result = new long[queries.length];
        for (int qi = 0; qi < queries.length; qi++) {
            int l = queries[qi][0],
                r = queries[qi][1];
            // First end whose run reaches back to l or earlier. Ends before
            // it sit past a drop at or after l and count their bare window
            // length; ends from there on count down to left[e].
            int p = firstAtLeast(left, l, l, r + 1);
            result[qi] = prefBase[r + 1] - prefBase[l] + prefLeft[p] - prefLeft[l] - (long) l * (p - l);
        }
        return result;
    }

    private int firstAtLeast(int[] values, int target, int from, int to) {
        int lo = from,
            hi = to;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (values[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
