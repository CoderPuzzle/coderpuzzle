#include <algorithm>
#include <numeric>
#include <vector>

class Solution {
  public:
    long long maximumValueSum(std::vector<std::vector<int>> &board) {
        // The three rooks occupy three distinct rows; pick the middle row i.
        // top[i][j] is the best cell in column j above row i and bottom[i][j]
        // the best below. A placement takes one column from the top band, one
        // from row i, one from the bottom band, all distinct — and only each
        // band's three best columns can matter, so 27 combinations per middle
        // row are exact. Sums reach 3 * 10^9, so accumulate in long long.
        int m = board.size(), n = board[0].size();
        std::vector<std::vector<long long>> top(m, std::vector<long long>(n));
        std::vector<std::vector<long long>> bottom(m, std::vector<long long>(n));
        for (int j = 0; j < n; ++j) {
            top[0][j] = board[0][j];
            for (int i = 1; i < m; ++i)
                top[i][j] = std::max(top[i - 1][j], (long long)board[i][j]);
            bottom[m - 1][j] = board[m - 1][j];
            for (int i = m - 2; i >= 0; --i)
                bottom[i][j] = std::max(bottom[i + 1][j], (long long)board[i][j]);
        }
        constexpr long long NEG = -(1LL << 62);
        long long ans = NEG;
        for (int i = 1; i < m - 1; ++i) {
            auto t = top3(top[i - 1]);
            auto mid = top3(board[i]);
            auto b = top3(bottom[i + 1]);
            for (int ca : t) {
                for (int cb : mid) {
                    if (cb == ca)
                        continue;
                    for (int cc : b) {
                        if (cc == ca || cc == cb)
                            continue;
                        ans = std::max(ans, top[i - 1][ca] + board[i][cb] + bottom[i + 1][cc]);
                    }
                }
            }
        }
        return ans;
    }

  private:
    template <typename T> static std::vector<int> top3(const std::vector<T> &vals) {
        std::vector<int> idx(vals.size());
        std::iota(idx.begin(), idx.end(), 0);
        std::sort(idx.begin(), idx.end(), [&](int a, int b) { return vals[a] > vals[b]; });
        idx.resize(3);
        return idx;
    }
};
