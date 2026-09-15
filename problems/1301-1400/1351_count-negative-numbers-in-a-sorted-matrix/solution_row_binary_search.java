class Solution {

    public int countNegatives(int[][] grid) {
        // Every row is non-increasing, so its negatives are a suffix and the
        // first negative index is one bisection away in O(log n).
        int n = grid[0].length;
        int count = 0;
        for (int[] row : grid) {
            int lo = 0;
            int hi = n;
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (row[mid] < 0) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            count += n - lo;
        }
        return count;
    }
}
