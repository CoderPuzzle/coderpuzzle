class Solution {

    public int colorTheGrid(int m, int n) {
        final int MOD = 1000000007;

        // Enumerate all valid column colorings (adjacent rows differ).
        java.util.List<int[]> states = new java.util.ArrayList<>();
        int total = 1;
        for (int r = 0; r < m; r++) total *= 3;
        for (int code = 0; code < total; code++) {
            int[] col = new int[m];
            int c = code;
            boolean ok = true;
            for (int r = 0; r < m; r++) {
                col[r] = c % 3;
                c /= 3;
            }
            for (int r = 0; r + 1 < m; r++) {
                if (col[r] == col[r + 1]) ok = false;
            }
            if (ok) states.add(col);
        }

        int len = states.size();
        // Two columns may be adjacent exactly when they differ in every row;
        // precompute that compatibility table once.
        java.util.List<java.util.List<Integer>> compat = new java.util.ArrayList<>();
        for (int i = 0; i < len; i++) {
            java.util.List<Integer> list = new java.util.ArrayList<>();
            for (int j = 0; j < len; j++) {
                boolean ok = true;
                for (int r = 0; r < m; r++) {
                    if (states.get(i)[r] == states.get(j)[r]) ok = false;
                }
                if (ok) list.add(j);
            }
            compat.add(list);
        }

        // All ones: the first column can take any valid coloring (this also
        // makes n=1 fall out with the loop body never running).
        long[] cur = new long[len];
        java.util.Arrays.fill(cur, 1L);
        for (int step = 0; step < n - 1; step++) {
            long[] nxt = new long[len];
            for (int i = 0; i < len; i++) {
                long c = cur[i];
                if (c != 0) {
                    // skip zero-count states as a constant-factor saving
                    for (int j : compat.get(i)) {
                        nxt[j] = (nxt[j] + c) % MOD;
                    }
                }
            }
            cur = nxt;
        }
        // The last column may end in any state, so sum the whole vector.
        long ans = 0;
        for (long c : cur) ans = (ans + c) % MOD;
        return (int) ans;
    }
}
