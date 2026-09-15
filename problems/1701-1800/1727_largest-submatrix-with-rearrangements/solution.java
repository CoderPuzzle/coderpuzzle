import java.util.Arrays;

class Solution {

    public int largestSubmatrix(int[][] matrix) {
        int m = matrix.length;
        if (m == 0) return 0;
        int n = matrix[0].length;
        int[] heights = new int[n];
        int best = 0;
        for (int[] row : matrix) {
            // heights[j] = run of consecutive ones ending at this row.
            for (int j = 0; j < n; j++) {
                heights[j] = row[j] == 1 ? heights[j] + 1 : 0;
            }
            // Columns may be rearranged, so only the multiset of heights
            // matters; scanning the ascending array from the end visits the
            // heights in descending order.
            int[] ordered = heights.clone();
            Arrays.sort(ordered);
            // ordered[i] is the (n-i)-th tallest run: the top n-i columns
            // all reach it and can be placed side by side, so width n-i.
            for (int i = n - 1; i >= 0; i--) {
                int h = ordered[i];
                // Descending order: everything past a zero is zero too.
                if (h == 0) break;
                int area = h * (n - i);
                if (area > best) best = area;
            }
        }
        return best;
    }
}
