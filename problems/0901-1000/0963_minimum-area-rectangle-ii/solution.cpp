class Solution {
  public:
    double minAreaFreeRect(vector<vector<int>> &points) {
        // A quadrilateral is a rectangle exactly when its two diagonals
        // bisect each other (shared midpoint) and have equal length:
        // bisection makes it a parallelogram, and equal diagonals make a
        // parallelogram rectangular. So every pair of points is hashed as a
        // candidate diagonal, and a match hands over both diagonals of a
        // rectangle whose four corners are all present. The doubled
        // midpoint (x1 + x2, y1 + y2) — integral even when the true
        // midpoint is half-integral — packs into one 64-bit key as
        // (x1 + x2) * 80001 + (y1 + y2); the squared diagonal length rides
        // along inside each bucket entry.
        unordered_map<long long, vector<array<long long, 3>>> diagonals;
        long long best2 = 0;
        int n = (int)points.size();
        for (int i = 0; i < n; ++i) {
            int x1 = points[i][0], y1 = points[i][1];
            for (int j = i + 1; j < n; ++j) {
                int x2 = points[j][0], y2 = points[j][1];
                long long dx = x1 - x2, dy = y1 - y2;
                long long center = (long long)(x1 + x2) * 80001 + (y1 + y2);
                long long length2 = dx * dx + dy * dy;
                vector<array<long long, 3>> &bucket = diagonals[center];
                for (const array<long long, 3> &stored : bucket) {
                    if (stored[2] != length2)
                        continue; // shared midpoint, different diagonal length
                    // The stored endpoint r marks one diagonal; its
                    // reflection through the shared midpoint marks the
                    // other. The rectangle's sides at (x1, y1) run to r and
                    // to that reflection, whose offset is (x2 - rx, y2 - ry).
                    long long ux = stored[0] - x1, uy = stored[1] - y1;
                    long long vx = x2 - stored[0], vy = y2 - stored[1];
                    long long area2 = (ux * ux + uy * uy) * (vx * vx + vy * vy);
                    if (best2 == 0 || area2 < best2)
                        best2 = area2;
                }
                bucket.push_back({x1, y1, length2});
            }
        }
        // A lattice rectangle's area is always an integer — perpendicular
        // integer side vectors make the product of squared side lengths a
        // perfect square — and at most (4 * 10^4)^2 = 1.6 * 10^9, so the
        // squared area is a 64-bit integer of at most 2.56 * 10^18 whose
        // root is recovered exactly: a double rounds such a value by at
        // most 256, the square root then sits within 2 * 10^-7 of the
        // integer area, and rounding snaps onto it.
        return (double)std::llround(std::sqrt((double)best2));
    }
};
