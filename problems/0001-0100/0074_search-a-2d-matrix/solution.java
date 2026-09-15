class Solution {

    public boolean searchMatrix(int[][] matrix, int target) {
        // Both guarantees together make row-major reading order one sorted
        // sequence, so a single bisection over the flattened index space
        // honors the O(log(m * n)) requirement.
        int m = matrix.length,
            n = matrix[0].length;
        int lo = 0,
            hi = m * n;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (matrix[mid / n][mid % n] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        // lo is the first flattened index holding a value >= target: the hit
        // itself when present, or the smallest value past it when absent.
        return lo < m * n && matrix[lo / n][lo % n] == target;
    }
}
