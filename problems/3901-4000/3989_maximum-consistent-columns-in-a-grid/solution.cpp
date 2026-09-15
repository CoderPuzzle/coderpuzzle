#include <algorithm>
#include <cstdlib>
#include <vector>

using namespace std;

class Solution {
  public:
    int maxConsistentColumns(vector<vector<int>> &grid, int limit) {
        int rows = (int)grid.size();
        int cols = (int)grid[0].size();
        vector<vector<bool>> compatible(cols, vector<bool>(cols, false));
        for (int a = 0; a < cols; ++a) {
            for (int b = a + 1; b < cols; ++b) {
                bool ok = true;
                for (int r = 0; r < rows; ++r) {
                    if (abs(grid[r][b] - grid[r][a]) > limit) {
                        ok = false;
                        break;
                    }
                }
                compatible[a][b] = ok;
            }
        }

        vector<int> dp(cols, 1);
        int answer = 1;
        for (int j = 0; j < cols; ++j) {
            for (int i = 0; i < j; ++i)
                if (compatible[i][j])
                    dp[j] = max(dp[j], dp[i] + 1);
            answer = max(answer, dp[j]);
        }
        return answer;
    }
};
