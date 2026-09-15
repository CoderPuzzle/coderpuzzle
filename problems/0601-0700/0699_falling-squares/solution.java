import java.util.Arrays;

class Solution {

    public int[] fallingSquares(int[][] positions) {
        // Coordinate compression: every left and right edge becomes a cell
        // boundary, so each square's footprint is a run of compressed cells
        // and touching edges share no cell — exactly the brushing rule.
        // Heights stay in int range: at most 1000 * 10^6 = 10^9 < 2^31.
        int n = positions.length;
        int[] coords = new int[2 * n];
        for (int i = 0; i < n; ++i) {
            coords[2 * i] = positions[i][0];
            coords[2 * i + 1] = positions[i][0] + positions[i][1];
        }
        Arrays.sort(coords);
        // Deduplicate in place: m boundaries delimit m - 1 cells.
        int m = 0;
        for (int i = 0; i < 2 * n; ++i) {
            if (i == 0 || coords[i] != coords[i - 1]) {
                coords[m++] = coords[i];
            }
        }
        // heights[k] is the top height over the cell [coords[k], coords[k+1]).
        int[] heights = new int[m];
        int[] ans = new int[n];
        int best = 0;
        int drop = 0;
        for (int[] square : positions) {
            int lo = Arrays.binarySearch(coords, 0, m, square[0]);
            int hi = Arrays.binarySearch(coords, 0, m, square[0] + square[1]);
            // The square lands on the tallest top among the cells it covers.
            int top = square[1];
            for (int cell = lo; cell < hi; ++cell) {
                top = Math.max(top, square[1] + heights[cell]);
            }
            for (int cell = lo; cell < hi; ++cell) {
                heights[cell] = top;
            }
            best = Math.max(best, top);
            ans[drop++] = best;
        }
        return ans;
    }
}
