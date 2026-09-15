import java.util.Arrays;

class Solution {

    public int numberOfPairs(int[][] points) {
        // Integer.compare, not subtraction: coordinates span +-10^9, so a
        // - b overflows int exactly at the extremes.
        Arrays.sort(points, (a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(b[1], a[1]));
        int n = points.length;
        int total = 0;
        for (int i = 0; i < n; i++) {
            int top = points[i][1];
            // Tallest y seen so far that does not exceed top; a candidate
            // at height y is valid exactly when window < y.
            int window = Integer.MIN_VALUE;
            for (int j = i + 1; j < n; j++) {
                int y = points[j][1];
                if (y > top) continue;
                if (window < y) total++;
                window = Math.max(window, y);
            }
        }
        return total;
    }
}
