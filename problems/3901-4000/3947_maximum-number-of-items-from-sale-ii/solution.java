import java.util.*;

class Solution {

    public long maximumSaleItems(int[][] a, int B) {
        int n = a.length,
            cheap = Integer.MAX_VALUE;
        int[] f = new int[n + 1],
            d = new int[n + 1];
        for (int[] x : a) f[x[0]]++;
        for (int z = 1; z <= n; z++) for (int x = z; x <= n; x += z) d[z] += f[x];
        long[][] q = new long[n][2];
        for (int i = 0; i < n; i++) {
            q[i][0] = a[i][1];
            q[i][1] = d[a[i][0]] - 1;
            cheap = Math.min(cheap, a[i][1]);
        }
        Arrays.sort(q, Comparator.comparingLong(x -> x[0]));
        long best = B / cheap,
            spent = 0,
            boost = 0;
        for (long[] x : q) {
            if (x[0] > 2L * cheap || x[1] == 0) continue;
            long take = Math.min(x[1], (B - spent) / x[0]);
            spent += take * x[0];
            boost += take;
            best = Math.max(best, 2 * boost + (B - spent) / cheap);
            if (take < x[1]) break;
        }
        return best;
    }
}
