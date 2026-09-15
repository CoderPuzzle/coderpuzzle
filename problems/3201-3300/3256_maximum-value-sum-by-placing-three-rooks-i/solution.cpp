#include <algorithm>
#include <vector>

class Solution {
  public:
    long long maximumValueSum(std::vector<std::vector<int>> &board) {
        int m = board.size();
        // Per row, only the three most valuable cells can ever matter: a
        // rook of an optimal placement sitting outside its row's top three
        // swaps into one of them — the three candidate columns face at most
        // two blocked ones, so some column is free and the swap never
        // lowers the sum.
        using Cell = std::pair<int, int>; // (value, column)
        std::vector<std::vector<Cell>> tops(m);
        for (int i = 0; i < m; ++i) {
            int n = board[i].size();
            for (int j = 0; j < n; ++j)
                tops[i].push_back({board[i][j], j});
            std::sort(tops[i].rbegin(), tops[i].rend());
            tops[i].resize(3);
        }

        // Row triples with one candidate each, pairwise-distinct columns.
        // Candidates are value-sorted, so combos run in decreasing
        // partial-sum order and a level is abandoned once even its best
        // completion — the other rows' top cells — cannot beat the answer.
        // Sums reach 3 * 10^9 in absolute value, past the 32-bit range.
        constexpr long long NEG = -(1LL << 62);
        long long ans = NEG;
        for (int i = 0; i < m; ++i) {
            const auto &ti = tops[i];
            for (int j = i + 1; j < m; ++j) {
                const auto &tj = tops[j];
                long long jTop = tj[0].first;
                for (int k = j + 1; k < m; ++k) {
                    const auto &tk = tops[k];
                    long long kTop = tk[0].first;
                    for (const auto &[va, ca] : ti) {
                        if (va + jTop + kTop <= ans)
                            break;
                        for (const auto &[vb, cb] : tj) {
                            if (cb == ca)
                                continue;
                            if (va + vb + kTop <= ans)
                                break;
                            for (const auto &[vc, cc] : tk) {
                                if (cc == ca || cc == cb)
                                    continue;
                                ans = std::max(ans, (long long)va + vb + vc);
                                break;
                            }
                        }
                    }
                }
            }
        }
        return ans;
    }
};
