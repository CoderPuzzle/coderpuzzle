import java.util.*;

class Solution {

    public long[] minimumRelativeLosses(int[] prices, int[][] queries) {
        Arrays.sort(prices);
        int n = prices.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + prices[i];
        long[] answer = new long[queries.length];
        for (int qi = 0; qi < queries.length; qi++) {
            long k = queries[qi][0];
            int m = queries[qi][1];
            int split = upperBound(prices, queries[qi][0]);
            // Every intermediate stays near 2 * 10^5 * 10^9, inside a long.
            int lo = Math.max(0, m - (n - split));
            int hi = Math.min(m, split);
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if ((long) prices[mid] + prices[n - m + mid] >= 2 * k) hi = mid;
                else lo = mid + 1;
            }
            int rest = m - lo;
            answer[qi] = prefix[lo] + 2 * k * rest - (prefix[n] - prefix[n - rest]);
        }
        return answer;
    }

    private int upperBound(int[] prices, int key) {
        int lo = 0;
        int hi = prices.length;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (prices[mid] <= key) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
