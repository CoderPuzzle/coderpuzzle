class Solution {
  public:
    bool isConvex(vector<vector<int>> &points) {
        // A convex polygon turns the same way at every vertex: the cross
        // product of the incoming and outgoing edge vectors is positive at
        // every left turn or negative at every right turn, so one sign of
        // each anywhere is a refutation.
        int n = (int)points.size();
        bool positive = false;
        bool negative = false;
        for (int i = 0; i < n; ++i) {
            long long x1 = points[i][0] - points[(i - 1 + n) % n][0];
            long long y1 = points[i][1] - points[(i - 1 + n) % n][1];
            long long x2 = points[(i + 1) % n][0] - points[i][0];
            long long y2 = points[(i + 1) % n][1] - points[i][1];
            // z == 0 means three consecutive vertices are collinear — legal
            // along an edge, so it votes for neither side.
            long long z = x1 * y2 - y1 * x2;
            if (z > 0) {
                positive = true;
            } else if (z < 0) {
                negative = true;
            }
            if (positive && negative) {
                return false;
            }
        }
        return true;
    }
};
