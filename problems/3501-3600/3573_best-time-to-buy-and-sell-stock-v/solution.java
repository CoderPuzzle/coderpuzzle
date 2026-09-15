import java.util.Arrays;

class Solution {

    public long maximumProfit(int[] prices, int k) {
        // Per day, for each count t of completed transactions: done[t] =
        // flat, openLong[t] = holding a bought share, openShort[t] =
        // holding a shorted share. NEG marks impossible states.
        final long NEG = -1_000_000_000_000_000L;
        long[] done = new long[k + 1];
        long[] openLong = new long[k + 1];
        long[] openShort = new long[k + 1];
        Arrays.fill(done, NEG);
        Arrays.fill(openLong, NEG);
        Arrays.fill(openShort, NEG);
        done[0] = 0;
        for (int price : prices) {
            // Closes today complete transaction t+1 from an open position.
            long[] nd = done.clone();
            for (int t = 0; t < k; ++t) {
                nd[t + 1] = Math.max(done[t + 1], Math.max(openLong[t] + price, openShort[t] - price));
            }
            // Opens read done[t] from BEFORE today's closes: a close and
            // the next open can never share a day (and an open can never
            // close the same day, since closes read the old open row).
            long[] nl = openLong.clone();
            long[] ns = openShort.clone();
            for (int t = 0; t <= k; ++t) {
                nl[t] = Math.max(nl[t], done[t] - price);
                ns[t] = Math.max(ns[t], done[t] + price);
            }
            done = nd;
            openLong = nl;
            openShort = ns;
        }
        long best = NEG;
        for (long v : done) best = Math.max(best, v);
        return best;
    }
}
