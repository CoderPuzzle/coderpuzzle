class Solution {
  public:
    vector<int> findPeakGrid(vector<vector<int>> &mat) {
        int m = mat.size(), n = mat[0].size();
        int lo = 0, hi = m - 1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            vector<int> &row = mat[mid];
            // Row maximum: already beats its left/right neighbors, so only the
            // vertical direction can disqualify it.
            int j = 0;
            for (int c = 1; c < n; ++c) {
                if (row[c] > row[j])
                    j = c;
            }
            // -1 perimeter outside the grid stands in for out-of-range neighbors.
            int up = mid > 0 ? mat[mid - 1][j] : -1;
            int down = mid < m - 1 ? mat[mid + 1][j] : -1;
            if (row[j] > up && row[j] > down)
                return {mid, j};
            // Recurse toward the larger vertical neighbor: that half's maximum is a
            // peak of the whole matrix, so the answer cannot be lost.
            if (up > row[j])
                hi = mid - 1;
            else
                lo = mid + 1;
        }
        return {};
    }
};
