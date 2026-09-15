#include <algorithm>
#include <vector>

class Solution {
  public:
    int deleteGreatestValue(std::vector<std::vector<int>> &grid) {
        // Sorting each row descending settles in one shot what every round
        // would delete from it: round k takes each row's k-th largest value.
        // The round's contribution is then just the max over rows of that
        // k-th largest -- no heap or marking simulation needed.
        for (auto &row : grid) {
            std::sort(row.begin(), row.end(), std::greater<int>());
        }
        int answer = 0;
        for (int j = 0; j < (int)grid[0].size(); ++j) {
            int best = 0;
            for (int i = 0; i < (int)grid.size(); ++i) {
                best = std::max(best, grid[i][j]);
            }
            answer += best;
        }
        return answer;
    }
};
