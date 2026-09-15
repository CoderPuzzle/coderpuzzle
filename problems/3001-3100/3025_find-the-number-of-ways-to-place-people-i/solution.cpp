class Solution {
  public:
    int numberOfPairs(vector<vector<int>> &points) {
        // Sorting by x ascending, y descending puts both ends of every valid
        // pair in a fixed order: each anchor's partners come strictly later
        // in the array.
        sort(points.begin(), points.end(),
             [](const vector<int> &a, const vector<int> &b) { return a[0] != b[0] ? a[0] < b[0] : a[1] > b[1]; });
        int total = 0;
        int n = (int)points.size();
        for (int i = 0; i < n; ++i) {
            int yi = points[i][1];
            // Every point already scanned between i and j has its x inside
            // the pair's span, so only the vertical window matters: best is
            // the largest y accepted so far, and yi >= yj > best holds
            // exactly when no other point lies in the closed rectangle —
            // rejected points are dominated by some accepted one, accepted
            // points are themselves inside it. Equal coordinates count as
            // on-the-line pairs; the border blocks everyone else.
            int best = -1; // coordinates are >= 0, so -1 is below everything
            for (int j = i + 1; j < n; ++j) {
                int yj = points[j][1];
                if (yi >= yj && yj > best) {
                    ++total;
                    best = yj;
                }
            }
        }
        return total;
    }
};
