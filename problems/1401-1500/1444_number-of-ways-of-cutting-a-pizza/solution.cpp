#include <string>
#include <vector>

class Solution {
  public:
    int ways(std::vector<std::string> &pizza, int k) {
        const long long MOD = 1'000'000'007LL;
        int rows = (int)pizza.size();
        int cols = (int)pizza[0].size();
        // apples[r][c] = apples in the rectangle (r, c)..(rows-1, cols-1).
        std::vector<std::vector<int>> apples(rows + 1, std::vector<int>(cols + 1, 0));
        for (int r = rows - 1; r >= 0; r--) {
            for (int c = cols - 1; c >= 0; c--) {
                apples[r][c] =
                    apples[r + 1][c] + apples[r][c + 1] - apples[r + 1][c + 1] + (pizza[r][c] == 'A' ? 1 : 0);
            }
        }
        std::vector<std::vector<std::vector<long long>>> memo(
            rows, std::vector<std::vector<long long>>(cols, std::vector<long long>(k, -1)));
        return (int)count(apples, memo, 0, 0, k - 1, rows, cols, MOD);
    }

  private:
    long long count(std::vector<std::vector<int>> &apples, std::vector<std::vector<std::vector<long long>>> &memo,
                    int r, int c, int remaining, int rows, int cols, const long long MOD) {
        if (apples[r][c] == 0) {
            return 0;
        }
        if (remaining == 0) {
            return 1;
        }
        if (memo[r][c][remaining] >= 0) {
            return memo[r][c][remaining];
        }
        long long total = 0;
        // Horizontal cuts: hand away rows r..i-1, keep (i, c).
        for (int i = r + 1; i < rows; i++) {
            if (apples[r][c] - apples[i][c] > 0) {
                total += count(apples, memo, i, c, remaining - 1, rows, cols, MOD);
            }
        }
        // Vertical cuts: hand away columns c..j-1, keep (r, j).
        for (int j = c + 1; j < cols; j++) {
            if (apples[r][c] - apples[r][j] > 0) {
                total += count(apples, memo, r, j, remaining - 1, rows, cols, MOD);
            }
        }
        memo[r][c][remaining] = total % MOD;
        return memo[r][c][remaining];
    }
};
