class Solution {
  public:
    int largestSubmatrix(vector<vector<int>> &matrix) {
        int m = matrix.size();
        if (m == 0)
            return 0;
        int n = matrix[0].size();
        vector<int> heights(n, 0);
        int best = 0;
        for (auto &row : matrix) {
            // heights[j] = run of consecutive ones ending at this row.
            for (int j = 0; j < n; j++) {
                heights[j] = row[j] == 1 ? heights[j] + 1 : 0;
            }
            // Columns may be rearranged, so only the multiset of heights
            // matters; descending order puts the (i+1)-th tallest run at i.
            vector<int> ordered = heights;
            sort(ordered.begin(), ordered.end(), greater<int>());
            // The top i+1 columns all reach height ordered[i], and the
            // rearrangement places them side by side — width i+1 is real.
            for (int i = 0; i < n; i++) {
                int h = ordered[i];
                // Descending order: everything after a zero is zero too.
                if (h == 0)
                    break;
                int area = h * (i + 1);
                if (area > best)
                    best = area;
            }
        }
        return best;
    }
};
