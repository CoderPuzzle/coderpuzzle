class Solution {

    public int kthSmallest(int[][] matrix, int k) {
        int n = matrix.length;
        long lo = matrix[0][0],
            hi = matrix[n - 1][n - 1];
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2; // floor of (lo + hi) / 2
            if (countLe(matrix, mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int) lo;
    }

    // Staircase walk from bottom-left: elements <= x.
    private long countLe(int[][] matrix, long x) {
        int n = matrix.length;
        long count = 0;
        int row = n - 1,
            col = 0;
        while (row >= 0 && col < n) {
            if (matrix[row][col] <= x) {
                count += row + 1;
                col++;
            } else {
                row--;
            }
        }
        return count;
    }
}
