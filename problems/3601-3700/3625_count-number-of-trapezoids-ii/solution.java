import java.util.HashMap;
import java.util.Map;

class Solution {

    public long countTrapezoids(int[][] points) {
        // Hash every segment by its sign-fixed reduced slope, and within
        // a slope by its line intercept: two segments sharing a slope but
        // lying on different lines never share an endpoint and always
        // span a convex quadrilateral, while same-line pairs are
        // degenerate. Per slope the valid base-pairs are C(m,2) minus the
        // same-line C(c,2) sums. A parallelogram has two parallel-side
        // pairs and is therefore counted in two slope buckets; hashing
        // segments by diagonal midpoint (excluding equal-slope pairs,
        // i.e. collinear quadruples) counts each parallelogram exactly
        // once, so one subtraction makes every convex quad with parallel
        // sides count once. Bucket counts reach C(125000, 2) ~ 7.8e9, so
        // long math is required.
        int n = points.length;
        // slope packed as (dy + 2000) * 4096 + (dx + 2000), midpoint as
        // (x1 + x2 + 2000) * 4096 + (y1 + y2 + 2000) -- both fit 12 bits.
        Map<Long, Map<Integer, Integer>> slopeLines = new HashMap<>();
        Map<Long, Map<Long, Integer>> midSlopes = new HashMap<>();
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];
                int g = gcd(Math.abs(dx), Math.abs(dy));
                dx /= g;
                dy /= g;
                if (dx < 0 || (dx == 0 && dy < 0)) {
                    dx = -dx;
                    dy = -dy;
                }
                long slope = (long) (dy + 2000) * 4096 + (dx + 2000);
                slopeLines
                    .computeIfAbsent(slope, k -> new HashMap<>())
                    .merge(dx * points[i][1] - dy * points[i][0], 1, Integer::sum);
                long mid = (long) (points[i][0] + points[j][0] + 2000) * 4096 + (points[i][1] + points[j][1] + 2000);
                midSlopes.computeIfAbsent(mid, k -> new HashMap<>()).merge(slope, 1, Integer::sum);
            }
        }
        long total = 0;
        for (Map<Integer, Integer> lines : slopeLines.values()) {
            long m = 0;
            for (int c : lines.values()) {
                m += c;
            }
            total += (m * (m - 1)) / 2;
            for (int c : lines.values()) {
                total -= ((long) c * (c - 1)) / 2;
            }
        }
        long parallelograms = 0;
        for (Map<Long, Integer> slopes : midSlopes.values()) {
            long c = 0;
            for (int s : slopes.values()) {
                c += s;
            }
            parallelograms += (c * (c - 1)) / 2;
            for (int s : slopes.values()) {
                parallelograms -= ((long) s * (s - 1)) / 2;
            }
        }
        return total - parallelograms;
    }

    private static int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}
