class Solution {

    public int minimumSum(int[][] grid) {
        final int INF = 1 << 30;
        // Any two disjoint rectangles are separated by a straight line, so
        // three covers always admit a hierarchical split: peel one side
        // band, cover its ones with their tight box, and split the remainder
        // into two tight boxes with one internal cut. Trying every peel and
        // cut over all four rotations finds the optimum. Pieces track
        // genuine tight extents because a peeled band may hold empty rows
        // inside its span.
        int best = INF;
        int[][] g = grid;
        for (int rot = 0; rot < 4; rot++) {
            int m = g.length;
            int n = g[0].length;
            int[] firsts = new int[m];
            int[] lasts = new int[m];
            for (int r = 0; r < m; r++) {
                int lo = -1;
                int hi = -1;
                for (int c = 0; c < n; c++) {
                    if (g[r][c] == 1) {
                        if (lo == -1) {
                            lo = c;
                        }
                        hi = c;
                    }
                }
                firsts[r] = lo;
                lasts[r] = hi;
            }
            for (int i = 1; i < m; i++) {
                // single rect over the peeled band rows [0..i)
                boolean tany = false;
                int trlo = m;
                int trhi = -1;
                int tclo = n;
                int tchi = -1;
                for (int r = 0; r < i; r++) {
                    if (firsts[r] != -1) {
                        tany = true;
                        trlo = Math.min(trlo, r);
                        trhi = Math.max(trhi, r);
                        tclo = Math.min(tclo, firsts[r]);
                        tchi = Math.max(tchi, lasts[r]);
                    }
                }
                if (!tany) {
                    continue;
                }
                int topArea = (trhi - trlo + 1) * (tchi - tclo + 1);

                // two rects over rows [i..m): horizontal cuts
                int sh = m - i;
                boolean[] sAny = new boolean[sh + 1];
                int[] sRlo = new int[sh + 1];
                int[] sRhi = new int[sh + 1];
                int[] sClo = new int[sh + 1];
                int[] sChi = new int[sh + 1];
                java.util.Arrays.fill(sClo, n);
                int brlo = sh;
                int brhi = -1;
                int bclo = n;
                int bchi = -1;
                boolean bany = false;
                for (int idx = sh - 1; idx >= 0; --idx) {
                    if (firsts[i + idx] != -1) {
                        bany = true;
                        brlo = Math.min(brlo, idx);
                        brhi = Math.max(brhi, idx);
                        bclo = Math.min(bclo, firsts[i + idx]);
                        bchi = Math.max(bchi, lasts[i + idx]);
                    }
                    sAny[idx] = bany;
                    sRlo[idx] = brlo;
                    sRhi[idx] = brhi;
                    sClo[idx] = bclo;
                    sChi[idx] = bchi;
                }
                int inner = INF;
                int prlo = sh;
                int prhi = -1;
                int pclo = n;
                int pchi = -1;
                boolean pany = false;
                for (int idx = 0; idx + 1 < sh; ++idx) {
                    if (firsts[i + idx] != -1) {
                        pany = true;
                        prlo = Math.min(prlo, idx);
                        prhi = Math.max(prhi, idx);
                        pclo = Math.min(pclo, firsts[i + idx]);
                        pchi = Math.max(pchi, lasts[i + idx]);
                    }
                    if (pany && sAny[idx + 1]) {
                        int cand =
                            (prhi - prlo + 1) * (pchi - pclo + 1) +
                            (sRhi[idx + 1] - sRlo[idx + 1] + 1) * (sChi[idx + 1] - sClo[idx + 1] + 1);
                        inner = Math.min(inner, cand);
                    }
                }

                // two rects over rows [i..m): vertical cuts
                int[] colLo = new int[n];
                int[] colHi = new int[n];
                boolean[] cseen = new boolean[n];
                java.util.Arrays.fill(colLo, m);
                for (int idx = 0; idx < sh; ++idx) {
                    if (firsts[i + idx] == -1) {
                        continue;
                    }
                    int[] row = g[i + idx];
                    for (int c = firsts[i + idx]; c <= lasts[i + idx]; ++c) {
                        if (row[c] == 1) {
                            cseen[c] = true;
                            colLo[c] = Math.min(colLo[c], idx);
                            colHi[c] = Math.max(colHi[c], idx);
                        }
                    }
                }
                boolean[] vAny = new boolean[n + 2];
                int[] vRlo = new int[n + 2];
                int[] vRhi = new int[n + 2];
                int[] vClo = new int[n + 2];
                int[] vChi = new int[n + 2];
                java.util.Arrays.fill(vRlo, m);
                java.util.Arrays.fill(vClo, n);
                int vrlo = m;
                int vrhi = -1;
                int vclo = n;
                int vchi = -1;
                boolean vany = false;
                for (int c = n - 1; c >= 0; --c) {
                    if (cseen[c]) {
                        vany = true;
                        vrlo = Math.min(vrlo, colLo[c]);
                        vrhi = Math.max(vrhi, colHi[c]);
                        vclo = Math.min(vclo, c);
                        vchi = Math.max(vchi, c);
                    }
                    vAny[c] = vany;
                    vRlo[c] = vrlo;
                    vRhi[c] = vrhi;
                    vClo[c] = vclo;
                    vChi[c] = vchi;
                }
                int lrlo = m;
                int lrhi = -1;
                int lclo = n;
                int lchi = -1;
                boolean lany = false;
                for (int j = 0; j + 1 < n; ++j) {
                    if (cseen[j]) {
                        lany = true;
                        lrlo = Math.min(lrlo, colLo[j]);
                        lrhi = Math.max(lrhi, colHi[j]);
                        lclo = Math.min(lclo, j);
                        lchi = Math.max(lchi, j);
                    }
                    if (lany && vAny[j + 1]) {
                        int cand =
                            (lrhi - lrlo + 1) * (lchi - lclo + 1) +
                            (vRhi[j + 1] - vRlo[j + 1] + 1) * (vChi[j + 1] - vClo[j + 1] + 1);
                        inner = Math.min(inner, cand);
                    }
                }

                if (inner < INF) {
                    best = Math.min(best, topArea + inner);
                }
            }
            g = rotate(g);
        }
        // At least three 1's guarantee some valid partition exists.
        return best;
    }

    // 90-degree clockwise rotation.
    private int[][] rotate(int[][] g) {
        int m = g.length;
        int n = g[0].length;
        int[][] out = new int[n][m];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                out[i][j] = g[m - 1 - j][i];
            }
        }
        return out;
    }
}
