import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int minimumCoins(int[] prices) {
        int n = prices.length;
        long[] dp = new long[n + 1];
        Deque<Integer> dq = new ArrayDeque<>();

        for (int i = 1; i <= n; i++) {
            while (!dq.isEmpty() && value(dq.peekLast(), dp, prices) >= value(i, dp, prices)) {
                dq.pollLast();
            }
            dq.addLast(i);
            int lo = (i + 1) / 2; // ceil(i / 2)
            while (!dq.isEmpty() && dq.peekFirst() < lo) {
                dq.pollFirst();
            }
            dp[i] = value(dq.peekFirst(), dp, prices);
        }
        return (int) dp[n];
    }

    private long value(int l, long[] dp, int[] prices) {
        return dp[l - 1] + prices[l - 1];
    }
}
