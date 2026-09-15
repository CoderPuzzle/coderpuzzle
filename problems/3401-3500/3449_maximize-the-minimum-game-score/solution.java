class Solution {

    public long maxScore(int[] points, int m) {
        int n = points.length;

        long lo = 0,
            hi = 0;
        for (int p : points) hi = Math.max(hi, (long) p * m);
        // feasibility is monotone in the target: binary search the largest achievable one
        while (lo < hi) {
            long mid = lo + (hi - lo + 1) / 2;
            if (feasible(points, m, mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

    private boolean feasible(int[] points, long m, long target) {
        int n = points.length;
        // an optimal walk for a fixed target never backtracks more than one
        // step: sweep left to right, bouncing across the i/i+1 boundary
        long moves = 0;
        // visits already banked at i by the bounce around the previous boundary
        long prev = 0;
        for (int i = 0; i < n; i++) {
            long gp = points[i];
            // visits still needed at i after crediting the banked ones
            long remain = (target + gp - 1) / gp - prev;
            if (remain >= 1) {
                // 2*remain-1 moves buy remain visits here, banking remain-1 at i+1
                prev = remain - 1;
                moves += 2 * remain - 1;
            } else if (i != n - 1) {
                // quota already met: a single forward move, nothing banked
                prev = 0;
                moves += 1;
            }
            if (moves > m) {
                return false;
            }
        }
        return moves <= m;
    }
}
