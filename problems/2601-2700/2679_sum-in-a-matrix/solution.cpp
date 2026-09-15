#include <algorithm>
#include <climits>
#include <vector>

class Solution {
  public:
    int matrixSum(vector<vector<int>> &nums) {
        // Operation k removes the largest remaining number of every row, so
        // after each row is sorted in decreasing order the k-th column holds
        // exactly what that row gives up in operation k — the score is the
        // sum of the column maxima, with already-emptied rows skipped.
        size_t width = 0;
        for (vector<int> &row : nums) {
            sort(row.begin(), row.end(), [](int a, int b) { return a > b; });
            width = max(width, row.size());
        }
        int score = 0;
        for (size_t column = 0; column < width; column++) {
            int best = INT_MIN;
            for (const vector<int> &row : nums) {
                if (column < row.size() && row[column] > best) {
                    best = row[column];
                }
            }
            score += best;
        }
        return score;
    }
};
