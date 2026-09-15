class Solution {

    public int matrixMedian(int[][] grid) {
        int m = grid.length,
            n = grid[0].length;
        // Odd element count, so the median is the m*n/2+1-th smallest value
        // — an actual matrix entry, returned exactly.
        int need = (m * n) / 2 + 1;
        // Binary-search the value itself between the smallest row head and
        // the largest row tail; find the smallest x with count >= need.
        int lo = Integer.MAX_VALUE,
            hi = Integer.MIN_VALUE;
        for (int[] row : grid) {
            lo = Math.min(lo, row[0]);
            hi = Math.max(hi, row[n - 1]);
        }
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (countLe(grid, mid) >= need) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }

    private long countLe(int[][] grid, int x) {
        // Each row is sorted, so a binary search counts its <=x entries in
        // O(log n); row counts add up across the matrix.
        long total = 0;
        for (int[] row : grid) {
            int a = 0,
                b = row.length;
            while (a < b) {
                int mid = (a + b) >>> 1;
                if (row[mid] <= x) a = mid + 1;
                else b = mid;
            }
            total += a;
        }
        return total;
    }
}
