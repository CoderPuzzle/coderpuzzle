import java.util.*;

class Solution {

    public long minOperations(int[] a, int k) {
        long[] e = cost(a, k, 0),
            o = cost(a, k, 1);
        Integer[] ix = new Integer[k];
        for (int i = 0; i < k; i++) ix[i] = i;
        Arrays.sort(ix, (x, y) -> Long.compare(o[x], o[y]));
        long ans = Long.MAX_VALUE;
        for (int x = 0; x < k; x++) ans = Math.min(ans, e[x] + o[ix[0] == x ? ix[1] : ix[0]]);
        return ans;
    }

    long[] cost(int[] a, int k, int p) {
        long[] c = new long[k],
            pc = new long[3 * k + 1],
            ps = new long[3 * k + 1],
            out = new long[k];
        for (int i = p; i < a.length; i += 2) c[a[i] % k]++;
        for (int i = 0; i < 3 * k; i++) {
            pc[i + 1] = pc[i] + c[i % k];
            ps[i + 1] = ps[i] + c[i % k] * i;
        }
        int h = k / 2;
        for (int x = 0; x < k; x++) {
            int m = x + k,
                l = m - h,
                r = m + k - 1 - h;
            long lc = pc[m + 1] - pc[l],
                ls = ps[m + 1] - ps[l],
                rc = pc[r + 1] - pc[m + 1],
                rs = ps[r + 1] - ps[m + 1];
            out[x] = m * lc - ls + rs - m * rc;
        }
        return out;
    }
}
