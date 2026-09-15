import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public double minAreaFreeRect(int[][] points) {
        // A quadrilateral is a rectangle exactly when its two diagonals
        // bisect each other (shared midpoint) and have equal length:
        // bisection makes it a parallelogram, and equal diagonals make a
        // parallelogram rectangular. So every pair of points is hashed as a
        // candidate diagonal, and a match hands over both diagonals of a
        // rectangle whose four corners are all present. The doubled
        // midpoint (x1 + x2, y1 + y2) — integral even when the true
        // midpoint is half-integral — packs into one long as
        // (x1 + x2) * 80001 + (y1 + y2); the squared diagonal length rides
        // along inside each bucket entry.
        Map<Long, List<long[]>> diagonals = new HashMap<>();
        long best2 = 0;
        int n = points.length;
        for (int i = 0; i < n; ++i) {
            int x1 = points[i][0];
            int y1 = points[i][1];
            for (int j = i + 1; j < n; ++j) {
                int x2 = points[j][0];
                int y2 = points[j][1];
                long dx = x1 - x2;
                long dy = y1 - y2;
                long center = (x1 + x2) * 80001L + (y1 + y2);
                long length2 = dx * dx + dy * dy;
                List<long[]> bucket = diagonals.computeIfAbsent(center, key -> new ArrayList<>());
                for (long[] stored : bucket) {
                    if (stored[2] != length2) {
                        continue; // shared midpoint, different diagonal length
                    }
                    // The stored endpoint r marks one diagonal; its
                    // reflection through the shared midpoint marks the
                    // other. The rectangle's sides at (x1, y1) run to r and
                    // to that reflection, whose offset is (x2 - rx, y2 - ry).
                    long ux = stored[0] - x1;
                    long uy = stored[1] - y1;
                    long vx = x2 - stored[0];
                    long vy = y2 - stored[1];
                    long area2 = (ux * ux + uy * uy) * (vx * vx + vy * vy);
                    if (best2 == 0 || area2 < best2) {
                        best2 = area2;
                    }
                }
                bucket.add(new long[] { x1, y1, length2 });
            }
        }
        // A lattice rectangle's area is always an integer — perpendicular
        // integer side vectors make the product of squared side lengths a
        // perfect square — and at most (4 * 10^4)^2 = 1.6 * 10^9, so the
        // squared area is a 64-bit integer of at most 2.56 * 10^18 whose
        // root is recovered exactly: a double rounds such a value by at
        // most 256, the square root then sits within 2 * 10^-7 of the
        // integer area, and Math.round snaps onto it.
        return (double) Math.round(Math.sqrt((double) best2));
    }
}
