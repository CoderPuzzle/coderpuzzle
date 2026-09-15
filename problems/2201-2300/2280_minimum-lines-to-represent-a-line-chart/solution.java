import java.util.*;

class Solution {

    public int minimumLines(int[][] stockPrices) {
        Arrays.sort(stockPrices, (a, b) -> Integer.compare(a[0], b[0]));
        int n = stockPrices.length;
        if (n <= 2) {
            return n - 1;
        }
        int lines = 1;
        for (int i = 2; i < n; i++) {
            // Differences stay under 1e9, but their products approach 1e18,
            // so widen to long before the cross-multiplied slope test.
            long x1 = stockPrices[i - 2][0],
                y1 = stockPrices[i - 2][1];
            long x2 = stockPrices[i - 1][0],
                y2 = stockPrices[i - 1][1];
            long x3 = stockPrices[i][0],
                y3 = stockPrices[i][1];
            if ((x2 - x1) * (y3 - y2) != (x3 - x2) * (y2 - y1)) {
                lines++;
            }
        }
        return lines;
    }
}
