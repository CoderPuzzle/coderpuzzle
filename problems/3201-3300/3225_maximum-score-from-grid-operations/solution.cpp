#include <algorithm>
#include <vector>

class Solution {
  public:
    long long maximumScore(std::vector<std::vector<int>> &grid) {
        int n = grid.size();
        // pre[j][r] = sum of grid[0..r-1][j]; every scored stretch of a
        // column is the difference of two such monotone prefixes.
        std::vector<std::vector<long long>> pre(n, std::vector<long long>(n + 1, 0));
        for (int j = 0; j < n; ++j) {
            for (int r = 0; r < n; ++r)
                pre[j][r + 1] = pre[j][r] + grid[r][j];
        }

        constexpr long long NEG = -(1LL << 60);
        // A play is fully described by one height h[j] in [0, n] per column
        // (cells 0..h[j]-1 end up black). Cell (r, j) scores iff it is white
        // (r >= h[j]) and some horizontal neighbor is black (r < taller
        // neighbor height), so column j is worth the segment of column sums
        // [h[j], max(h[j-1], h[j+1])). Walk columns left to right carrying
        // the last two heights; choosing the next height settles the middle
        // column's flanks, crediting it exactly once. dp[c][a]: best score
        // after assigning columns 0..t-1 with h[t-1] = c, h[t-2] = a.
        std::vector<std::vector<long long>> dp(n + 1, std::vector<long long>(n + 1, NEG));
        for (int c = 0; c <= n; ++c)
            dp[c][0] = 0;

        for (int t = 1; t < n; ++t) {
            const auto &pcol = pre[t - 1];
            std::vector<std::vector<long long>> ndp(n + 1, std::vector<long long>(n + 1, NEG));
            for (int a = 0; a <= n; ++a) {
                const auto &row = dp[a];
                // Credit for choosing h[t] = c is
                //   row[b] + pcol[max(a, b, c)] - pcol[a]
                // over previous heights b. Splitting b against K = max(a, c)
                // makes this an O(1) pair of lookup maxima: b <= K adds the
                // constant pcol[K] to a prefix maximum, while b > K keeps its
                // own pcol[b] in a suffix maximum.
                std::vector<long long> pm(n + 1), sp(n + 2, NEG);
                long long m = NEG;
                for (int b = 0; b <= n; ++b) {
                    m = std::max(m, row[b]);
                    pm[b] = m;
                }
                for (int b = n; b >= 0; --b) {
                    sp[b] = std::max(sp[b + 1], row[b] + pcol[b]);
                }
                for (int c = 0; c <= n; ++c) {
                    int k = std::max(a, c);
                    long long best = std::max(pm[k] + pcol[k], sp[k + 1]);
                    ndp[c][a] = std::max(ndp[c][a], best - pcol[a]);
                }
            }
            dp = std::move(ndp);
        }

        // Final virtual choice: the last column has no right neighbor, so it
        // is credited against max(h[n-2], 0).
        const auto &plast = pre[n - 1];
        long long ans = -1;
        for (int a = 0; a <= n; ++a) {
            const auto &row = dp[a];
            std::vector<long long> pm(n + 1), sp(n + 2, NEG);
            long long m = NEG;
            for (int b = 0; b <= n; ++b) {
                m = std::max(m, row[b]);
                pm[b] = m;
            }
            for (int b = n; b >= 0; --b) {
                sp[b] = std::max(sp[b + 1], row[b] + plast[b]);
            }
            long long best = std::max(pm[a] + plast[a], sp[a + 1]);
            ans = std::max(ans, best - plast[a]);
        }
        return ans;
    }
};
