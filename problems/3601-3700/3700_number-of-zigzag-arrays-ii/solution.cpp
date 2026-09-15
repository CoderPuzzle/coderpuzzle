class Solution {
  public:
    int zigZagArrays(int n, int l, int r) {
        const long long MOD = 1e9 + 7;
        int m = r - l + 1;
        // Reflecting the range (x -> l + r - x) swaps "next step must rise"
        // with "must fall" while fixing the all-ones start, so the falling
        // block always mirrors the rising one and one block evolves alone:
        // by the matrix S with S[w][u] = 1 exactly when u + w <= m - 2.
        vector<vector<long long>> s(m, vector<long long>(m, 0));
        for (int w = 0; w < m; w++) {
            for (int u = 0; u + w <= m - 2; u++) {
                s[w][u] = 1;
            }
        }
        vector<long long> v(m, 1);
        long long k = n - 1L;
        while (k > 0) {
            if (k & 1) {
                vector<long long> nv(m);
                for (int i = 0; i < m; i++) {
                    // A residue product stays under 2^60, so reduce every
                    // eight additions to keep the accumulator inside i64.
                    long long acc = 0;
                    int t = 0;
                    for (int j = 0; j < m; j++) {
                        acc += s[i][j] * v[j];
                        if (++t == 8) {
                            acc %= MOD;
                            t = 0;
                        }
                    }
                    nv[i] = acc % MOD;
                }
                v.swap(nv);
            }
            k >>= 1;
            if (k > 0) {
                // S[w][u] depends only on w + u, so S is symmetric and stays
                // symmetric under powers: square it as its Gram matrix, one
                // triangle at a time.
                vector<vector<long long>> g(m, vector<long long>(m, 0));
                for (int i = 0; i < m; i++) {
                    for (int j = i; j < m; j++) {
                        long long acc = 0;
                        int t = 0;
                        for (int q = 0; q < m; q++) {
                            acc += s[i][q] * s[j][q];
                            if (++t == 8) {
                                acc %= MOD;
                                t = 0;
                            }
                        }
                        g[i][j] = acc % MOD;
                        g[j][i] = g[i][j];
                    }
                }
                s.swap(g);
            }
        }
        // The mirrored block doubles the surviving block's mass.
        long long total = 0;
        for (long long x : v) {
            total += x;
        }
        return static_cast<int>(2 * total % MOD);
    }
};
