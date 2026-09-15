class Solution {
  public:
    double largestTriangleArea(vector<vector<int>> &points) {
        // Every triangle is three of the points, and at most C(50,3) =
        // 19,600 triples is few enough to enumerate them all: three nested
        // loops over i < j < k keep the largest area. The area is half the
        // absolute cross product of the edge vectors b - a and c - a, kept
        // in exact integers until the single final division by 2 — a power
        // of two, so the returned double is exact and a degenerate
        // (collinear) triple simply contributes area 0.
        int n = points.size();
        double best = 0.0;
        for (int i = 0; i < n; ++i) {
            int ax = points[i][0];
            int ay = points[i][1];
            for (int j = i + 1; j < n; ++j) {
                int ux = points[j][0] - ax;
                int uy = points[j][1] - ay;
                for (int k = j + 1; k < n; ++k) {
                    // The cross stays in a long long: exact for coordinates
                    // up to 50 in magnitude, and never truncated to 32 bits.
                    long long cross = (long long)ux * (points[k][1] - ay) - (long long)uy * (points[k][0] - ax);
                    double area = std::abs(cross) / 2.0;
                    if (area > best) {
                        best = area;
                    }
                }
            }
        }
        return best;
    }
};
