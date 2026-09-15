class Solution {
  public:
    int minimumSum(vector<vector<int>> &grid) {
        const int INF = 1 << 30;
        // Any two disjoint rectangles are separated by a straight line, so
        // three covers always admit a hierarchical split: peel one side
        // band, cover its ones with their tight box, and split the remainder
        // into two tight boxes with one internal cut. Trying every peel and
        // cut over all four rotations finds the optimum. Pieces track
        // genuine tight extents because a peeled band may hold empty rows
        // inside its span.
        int best = INF;
        vector<vector<int>> g = grid;
        for (int rot = 0; rot < 4; ++rot) {
            int m = g.size();
            int n = g[0].size();
            vector<int> firsts(m, -1);
            vector<int> lasts(m, -1);
            for (int r = 0; r < m; ++r) {
                int lo = -1;
                int hi = -1;
                for (int c = 0; c < n; ++c) {
                    if (g[r][c] == 1) {
                        if (lo == -1)
                            lo = c;
                        hi = c;
                    }
                }
                firsts[r] = lo;
                lasts[r] = hi;
            }
            for (int i = 1; i < m; ++i) {
                // single rect over the peeled band rows [0..i)
                bool tany = false;
                int trlo = m;
                int trhi = -1;
                int tclo = n;
                int tchi = -1;
                for (int r = 0; r < i; ++r) {
                    if (firsts[r] != -1) {
                        tany = true;
                        trlo = min(trlo, r);
                        trhi = max(trhi, r);
                        tclo = min(tclo, firsts[r]);
                        tchi = max(tchi, lasts[r]);
                    }
                }
                if (!tany) {
                    continue;
                }
                int topArea = (trhi - trlo + 1) * (tchi - tclo + 1);

                // two rects over rows [i..m): horizontal cuts
                int sh = m - i;
                vector<char> sAny(sh + 1, 0);
                vector<int> sRlo(sh + 1, 0);
                vector<int> sRhi(sh + 1, -1);
                vector<int> sClo(sh + 1, n);
                vector<int> sChi(sh + 1, -1);
                int brlo = sh;
                int brhi = -1;
                int bclo = n;
                int bchi = -1;
                bool bany = false;
                for (int idx = sh - 1; idx >= 0; --idx) {
                    if (firsts[i + idx] != -1) {
                        bany = true;
                        brlo = min(brlo, idx);
                        brhi = max(brhi, idx);
                        bclo = min(bclo, firsts[i + idx]);
                        bchi = max(bchi, lasts[i + idx]);
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
                bool pany = false;
                for (int idx = 0; idx + 1 < sh; ++idx) {
                    if (firsts[i + idx] != -1) {
                        pany = true;
                        prlo = min(prlo, idx);
                        prhi = max(prhi, idx);
                        pclo = min(pclo, firsts[i + idx]);
                        pchi = max(pchi, lasts[i + idx]);
                    }
                    if (pany && sAny[idx + 1]) {
                        int cand = (prhi - prlo + 1) * (pchi - pclo + 1) +
                                   (sRhi[idx + 1] - sRlo[idx + 1] + 1) * (sChi[idx + 1] - sClo[idx + 1] + 1);
                        inner = min(inner, cand);
                    }
                }

                // two rects over rows [i..m): vertical cuts
                vector<int> colLo(n, m);
                vector<int> colHi(n, -1);
                vector<char> cseen(n, 0);
                for (int idx = 0; idx < sh; ++idx) {
                    if (firsts[i + idx] == -1) {
                        continue;
                    }
                    const vector<int> &row = g[i + idx];
                    for (int c = firsts[i + idx]; c <= lasts[i + idx]; ++c) {
                        if (row[c] == 1) {
                            cseen[c] = 1;
                            colLo[c] = min(colLo[c], idx);
                            colHi[c] = max(colHi[c], idx);
                        }
                    }
                }
                vector<char> vAny(n + 1, 0);
                vector<int> vRlo(n + 1, m);
                vector<int> vRhi(n + 1, -1);
                vector<int> vClo(n + 1, n);
                vector<int> vChi(n + 1, -1);
                int vrlo = m;
                int vrhi = -1;
                int vclo = n;
                int vchi = -1;
                bool vany = false;
                for (int c = n - 1; c >= 0; --c) {
                    if (cseen[c]) {
                        vany = true;
                        vrlo = min(vrlo, colLo[c]);
                        vrhi = max(vrhi, colHi[c]);
                        vclo = min(vclo, c);
                        vchi = max(vchi, c);
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
                bool lany = false;
                for (int j = 0; j + 1 < n; ++j) {
                    if (cseen[j]) {
                        lany = true;
                        lrlo = min(lrlo, colLo[j]);
                        lrhi = max(lrhi, colHi[j]);
                        lclo = min(lclo, j);
                        lchi = max(lchi, j);
                    }
                    if (lany && vAny[j + 1]) {
                        int cand = (lrhi - lrlo + 1) * (lchi - lclo + 1) +
                                   (vRhi[j + 1] - vRlo[j + 1] + 1) * (vChi[j + 1] - vClo[j + 1] + 1);
                        inner = min(inner, cand);
                    }
                }

                if (inner < INF) {
                    best = min(best, topArea + inner);
                }
            }
            g = rotate(g);
        }
        // At least three 1's guarantee some valid partition exists.
        return best;
    }

  private:
    // 90-degree clockwise rotation.
    static vector<vector<int>> rotate(const vector<vector<int>> &g) {
        int m = g.size();
        int n = g[0].size();
        vector<vector<int>> out(n, vector<int>(m));
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                out[i][j] = g[m - 1 - j][i];
            }
        }
        return out;
    }
};
