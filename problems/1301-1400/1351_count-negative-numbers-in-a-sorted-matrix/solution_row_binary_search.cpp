class Solution {
  public:
    int countNegatives(vector<vector<int>> &grid) {
        // Every row is non-increasing, so its negatives are a suffix and the
        // first negative index is one bisection away in O(log n).
        int n = (int)grid[0].size();
        int count = 0;
        for (const auto &row : grid) {
            int lo = 0;
            int hi = n;
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (row[mid] < 0) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            count += n - lo;
        }
        return count;
    }
};
