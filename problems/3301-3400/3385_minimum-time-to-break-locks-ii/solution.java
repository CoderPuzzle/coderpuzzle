import java.util.*;

class Solution {

    // The k-th lock broken (1-indexed) is charged at factor k: its energy
    // grows by k each minute from 0, so it breaks after exactly
    // ceil(strength / k) minutes. Waiting longer never helps, and X
    // depends only on how many locks are already broken, so the total
    // time is sum over k of ceil(strength[order[k]] / k), minimized over
    // all break orders — a minimum-cost perfect matching between locks
    // and positions, solved by the O(n^3) Hungarian algorithm with
    // potentials.
    public int findMinimumTime(int[] strength) {
        int n = strength.length;
        long[][] cost = new long[n][n];
        for (int i = 0; i < n; i++) {
            for (int k = 0; k < n; k++) {
                cost[i][k] = (strength[i] + k) / (k + 1);
            }
        }
        long inf = 1L << 60;
        long[] u = new long[n + 1];
        long[] v = new long[n + 1];
        int[] p = new int[n + 1]; // p[j] = 1-indexed row matched to column j
        int[] way = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            p[0] = i;
            int j0 = 0;
            long[] minv = new long[n + 1];
            boolean[] used = new boolean[n + 1];
            Arrays.fill(minv, inf);
            for (;;) {
                used[j0] = true;
                int i0 = p[j0];
                long delta = inf;
                int j1 = 0;
                for (int j = 1; j <= n; j++) {
                    if (!used[j]) {
                        long cur = cost[i0 - 1][j - 1] - u[i0] - v[j];
                        if (cur < minv[j]) {
                            minv[j] = cur;
                            way[j] = j0;
                        }
                        if (minv[j] < delta) {
                            delta = minv[j];
                            j1 = j;
                        }
                    }
                }
                for (int j = 0; j <= n; j++) {
                    if (used[j]) {
                        u[p[j]] += delta;
                        v[j] -= delta;
                    } else {
                        minv[j] -= delta;
                    }
                }
                j0 = j1;
                if (p[j0] == 0) {
                    break;
                }
            }
            while (j0 > 0) {
                int j1 = way[j0];
                p[j0] = p[j1];
                j0 = j1;
            }
        }
        long total = 0;
        for (int j = 1; j <= n; j++) {
            total += cost[p[j] - 1][j - 1];
        }
        return (int) total;
    }
}
