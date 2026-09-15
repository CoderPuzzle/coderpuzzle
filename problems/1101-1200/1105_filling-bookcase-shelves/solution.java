import java.util.*;

class Solution {

    public int minHeightShelves(int[][] books, int shelfWidth) {
        // Order is fixed and each shelf holds a contiguous run, so the only
        // freedom is where boundaries fall: dp[i] = best height for the first
        // i books, with dp[0] = 0 as the empty base.
        int count = books.length;
        int[] dp = new int[count + 1];
        for (int i = 1; i <= count; i++) {
            // Grow the last shelf of the prefix backwards from book i-1,
            // accumulating width and the run's max height.
            int width = 0;
            int height = 0;
            dp[i] = Integer.MAX_VALUE;
            for (int j = i - 1; j >= 0; j--) {
                int thickness = books[j][0];
                int bookHeight = books[j][1];
                width += thickness;
                // Earlier books only widen the run further: stop here.
                if (width > shelfWidth) {
                    break;
                }
                height = Math.max(height, bookHeight);
                // Books j..i-1 form the last shelf at cost dp[j] + height.
                dp[i] = Math.min(dp[i], dp[j] + height);
            }
        }
        return dp[count];
    }
}
