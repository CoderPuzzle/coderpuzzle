class Solution {
  public:
    int numberOfPairs(vector<vector<int>> &points) {
        // x ascending, x-ties by y descending: every candidate lower-right
        // corner of an upper-left anchor lives at a later index, and so
        // does every potential blocker of such a pair.
        sort(points.begin(), points.end(),
             [](const vector<int> &a, const vector<int> &b) { return a[0] != b[0] ? a[0] < b[0] : a[1] > b[1]; });
        int n = points.size();
        int total = 0;
        for (int i = 0; i < n; ++i) {
            int top = points[i][1];
            // Tallest y seen so far that does not exceed top; a candidate
            // at height y is valid exactly when window < y.
            int window = INT_MIN;
            for (int j = i + 1; j < n; ++j) {
                int y = points[j][1];
                if (y > top)
                    continue;
                if (window < y)
                    ++total;
                window = max(window, y);
            }
        }
        return total;
    }
};
