import java.util.*;

class Solution {

    public long subtreeInversionSum(int[][] e, int[] nums, int k) {
        int n = nums.length,
            w = k + 1;
        List<Integer>[] g = new ArrayList[n];
        for (int i = 0; i < n; i++) g[i] = new ArrayList<>();
        for (int[] x : e) {
            g[x[0]].add(x[1]);
            g[x[1]].add(x[0]);
        }
        int[] p = new int[n],
            ord = new int[n];
        Arrays.fill(p, -1);
        int os = 1;
        for (int z = 0; z < os; z++) {
            int u = ord[z];
            for (int v : g[u])
                if (v != p[u]) {
                    p[v] = u;
                    ord[os++] = v;
                }
        }
        long I = Long.MAX_VALUE / 4,
            N = -I;
        long[] mx = new long[n * w],
            mn = new long[n * w];
        Arrays.fill(mx, N);
        Arrays.fill(mn, I);
        for (int z = n - 1; z >= 0; z--) {
            int u = ord[z];
            long[] a = new long[w],
                b = new long[w];
            Arrays.fill(a, N);
            Arrays.fill(b, I);
            a[k] = b[k] = nums[u];
            long sm = -nums[u],
                sn = -nums[u];
            for (int v : g[u])
                if (p[v] == u) {
                    int o = v * w;
                    sm -= Math.min(mn[o + k - 1], mn[o + k]);
                    sn -= Math.max(mx[o + k - 1], mx[o + k]);
                    long[] x = new long[w],
                        y = new long[w];
                    Arrays.fill(x, N);
                    Arrays.fill(y, I);
                    for (int d = 0; d < k; d++) {
                        x[d + 1] = mx[o + d];
                        y[d + 1] = mn[o + d];
                    }
                    x[k] = Math.max(x[k], mx[o + k]);
                    y[k] = Math.min(y[k], mn[o + k]);
                    long[] ax = a.clone(),
                        ay = b.clone(),
                        xx = x.clone(),
                        xy = y.clone();
                    for (int d = k - 1; d >= 0; d--) {
                        ax[d] = Math.max(ax[d], ax[d + 1]);
                        ay[d] = Math.min(ay[d], ay[d + 1]);
                        xx[d] = Math.max(xx[d], xx[d + 1]);
                        xy[d] = Math.min(xy[d], xy[d + 1]);
                    }
                    long[] na = new long[w],
                        nb = new long[w];
                    Arrays.fill(na, N);
                    Arrays.fill(nb, I);
                    na[k] = a[k] + x[k];
                    nb[k] = b[k] + y[k];
                    for (int d = 1; d < k; d++) {
                        int t = Math.max(d, k - d);
                        na[d] = Math.max(a[d] + xx[t], x[d] + ax[t]);
                        nb[d] = Math.min(b[d] + xy[t], y[d] + ay[t]);
                    }
                    a = na;
                    b = nb;
                }
            a[0] = sm;
            b[0] = sn;
            System.arraycopy(a, 0, mx, u * w, w);
            System.arraycopy(b, 0, mn, u * w, w);
        }
        long ans = N;
        for (int d = 0; d < w; d++) ans = Math.max(ans, mx[d]);
        return ans;
    }
}
