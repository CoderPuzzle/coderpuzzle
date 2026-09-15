import java.util.ArrayList;
import java.util.List;

class Solution {

    private static final long MOD = 1_000_000_007L;
    private static final long NEG = -((long) 1e18);

    public int goodSubtreeSum(int[] vals, int[] par) {
        int n = vals.length;
        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < n; i++) children.add(new ArrayList<>());
        for (int i = 1; i < n; i++) {
            children.get(par[i]).add(i);
        }

        int[] umask = new int[n];
        boolean[] selectable = new boolean[n];
        for (int i = 0; i < n; i++) {
            int mask = 0;
            String s = String.valueOf(vals[i]);
            boolean[] seen = new boolean[10];
            boolean distinct = true;
            for (char ch : s.toCharArray()) {
                int d = ch - '0';
                if (seen[d]) distinct = false;
                seen[d] = true;
                mask |= 1 << d;
            }
            umask[i] = mask;
            selectable[i] = distinct;
        }

        // post-order
        List<Integer> order = new ArrayList<>();
        int[] stack = new int[n];
        int sp = 0;
        stack[sp++] = 0;
        while (sp > 0) {
            int u = stack[--sp];
            order.add(u);
            for (int v : children.get(u)) {
                stack[sp++] = v;
            }
        }

        long[][] dp = new long[n][];
        long total = 0;
        for (int idx = n - 1; idx >= 0; idx--) {
            int u = order.get(idx);
            long[] comb = new long[1024];
            java.util.Arrays.fill(comb, NEG);
            comb[0] = 0;
            for (int c : children.get(u)) {
                comb = subsetConvolve(comb, dp[c]);
            }

            long[] du = comb.clone();
            if (selectable[u]) {
                int mu = umask[u];
                for (int mask = 0; mask < 1024; mask++) {
                    if ((mask & mu) == mu) {
                        int rest = mask ^ mu;
                        if (comb[rest] != NEG) {
                            long val = comb[rest] + vals[u];
                            if (val > du[mask]) du[mask] = val;
                        }
                    }
                }
            }
            dp[u] = du;
            long best = du[0];
            for (int m = 1; m < 1024; m++) {
                if (du[m] > best) best = du[m];
            }
            total += best;
        }
        return (int) (total % MOD);
    }

    // res[c] = max over x subset of c of a[x] + b[c^x]
    private static long[] subsetConvolve(long[] a, long[] b) {
        long[] res = new long[1024];
        for (int c = 0; c < 1024; c++) {
            long best = NEG;
            int x = c;
            while (true) {
                int y = c ^ x;
                long v = a[x] + b[y];
                if (v > best) best = v;
                if (x == 0) break;
                x = (x - 1) & c;
            }
            res[c] = best;
        }
        return res;
    }
}
