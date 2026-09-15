import java.util.*;

class Solution {

    public int maximumSaleItems(int[][] a, int B) {
        int M = 0;
        for (int[] item : a) M = Math.max(M, item[0]);
        int[] f = new int[M + 1],
            d = new int[M + 1];
        for (int[] item : a) f[item[0]]++;
        for (int z = 1; z <= M; z++) for (int multiple = z; multiple <= M; multiple += z) d[z] += f[multiple];
        int N = -1000000000;
        int[] dp = new int[B + 1];
        Arrays.fill(dp, N);
        dp[0] = 0;
        for (int[] item : a) {
            int price = item[1];
            int gain = d[item[0]];
            int[] old = dp;
            int[] nw = dp.clone();
            for (int r = 0; r < Math.min(price, B + 1); r++) {
                int best = N,
                    q = 0;
                for (int cost = r; cost <= B; cost += price, q++) {
                    if (q > 0 && old[cost - price] > N) best = Math.max(best, old[cost - price] - q + 1);
                    if (best > N) nw[cost] = Math.max(nw[cost], q + gain - 1 + best);
                }
            }
            dp = nw;
        }
        return Arrays.stream(dp).max().getAsInt();
    }
}
