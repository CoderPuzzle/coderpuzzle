class Solution {

    public int[] longestObstacleCourseAtEachPosition(int[] obstacles) {
        int n = obstacles.length;
        // tails[j] = smallest possible tail of a non-decreasing subsequence
        // of length j+1 over the prefix so far; it stays sorted, so each
        // obstacle is placed by binary search.
        int[] tails = new int[n];
        int len = 0;
        int[] ans = new int[n];
        for (int idx = 0; idx < n; idx++) {
            int x = obstacles[idx];
            // Search for the first strictly greater tail (upper bound): an
            // obstacle equal to a tail extends that course instead of
            // replacing it -- the only change vs strict LIS.
            int lo = 0,
                hi = len;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (tails[mid] <= x) lo = mid + 1;
                else hi = mid;
            }
            // Overwrite the first improvable tail (keeping it minimal), or
            // extend when x is at least as tall as every current tail.
            tails[lo] = x;
            if (lo == len) len++;
            // Insertion index + 1 = longest course ending with this obstacle.
            ans[idx] = lo + 1;
        }
        return ans;
    }
}
