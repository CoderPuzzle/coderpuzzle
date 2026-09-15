import java.util.Arrays;

class Solution {

    public int minDayskVariants(int[][] points, int k) {
        // At day t a variant reaches exactly the L1 ball of radius t around
        // its origin, so the answer is min over every lattice point p of the
        // k-th smallest L1 distance from p to the n origins. Any point
        // outside the bounding box can be projected onto the box, which only
        // shrinks every distance, so the minimizer lies inside it. With
        // coordinates bounded by 100 the box has at most 100*100 points and
        // n <= 50, so sorting the n distances per point is cheap.
        int minX = Integer.MAX_VALUE,
            maxX = Integer.MIN_VALUE;
        int minY = Integer.MAX_VALUE,
            maxY = Integer.MIN_VALUE;
        for (int[] p : points) {
            minX = Math.min(minX, p[0]);
            maxX = Math.max(maxX, p[0]);
            minY = Math.min(minY, p[1]);
            maxY = Math.max(maxY, p[1]);
        }
        int best = Integer.MAX_VALUE;
        for (int x = minX; x <= maxX; x++) {
            for (int y = minY; y <= maxY; y++) {
                int[] dists = new int[points.length];
                for (int i = 0; i < points.length; i++) {
                    dists[i] = Math.abs(x - points[i][0]) + Math.abs(y - points[i][1]);
                }
                Arrays.sort(dists);
                best = Math.min(best, dists[k - 1]);
            }
        }
        return best;
    }
}
