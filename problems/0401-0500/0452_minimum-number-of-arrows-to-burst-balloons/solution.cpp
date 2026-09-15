class Solution {
  public:
    int findMinArrowShots(vector<vector<int>> &points) {
        sort(points.begin(), points.end(), [](const vector<int> &a, const vector<int> &b) { return a[1] < b[1]; });
        // Point-cover greedy: sort by right endpoint and shoot at the right
        // end of the first unburst balloon — among points covering it, the
        // right endpoint covers every interval any earlier point could.
        int arrows = 0;
        // Sentinel below any coordinate (coordinates span signed 32-bit).
        long long lastArrow = LLONG_MIN;
        for (const auto &point : points) {
            // Strict >: intervals are closed, so start == lastArrow is
            // already burst; otherwise shoot at the earliest end remaining.
            if (point[0] > lastArrow) {
                arrows++;
                lastArrow = point[1];
            }
        }
        return arrows;
    }
};
