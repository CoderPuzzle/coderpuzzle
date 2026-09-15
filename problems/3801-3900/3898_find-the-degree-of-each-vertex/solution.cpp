#include <numeric>
#include <vector>

class Solution {
  public:
    vector<int> findDegrees(vector<vector<int>> &matrix) {
        vector<int> degrees;
        degrees.reserve(matrix.size());
        for (const vector<int> &row : matrix) {
            degrees.push_back(accumulate(row.begin(), row.end(), 0));
        }
        return degrees;
    }
};
