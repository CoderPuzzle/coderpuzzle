class Solution {

    public double getMinDistSum(int[][] positions) {
        int n = positions.length;
        // start from the centroid, a reasonable first guess for the median
        double x = 0,
            y = 0;
        for (int[] p : positions) {
            x += p[0];
            y += p[1];
        }
        x /= n;
        y /= n;
        final double eps = 1e-9; // keeps the weight finite if the guess lands on a customer
        for (int it = 0; it < 300; it++) {
            double numX = 0,
                numY = 0,
                weightSum = 0;
            for (int[] p : positions) {
                double px = p[0],
                    py = p[1];
                double distance = Math.hypot(x - px, y - py) + eps;
                double weight = 1.0 / distance;
                numX += weight * px;
                numY += weight * py;
                weightSum += weight;
            }
            x = numX / weightSum;
            y = numY / weightSum;
        }
        double total = 0;
        for (int[] p : positions) {
            total += Math.hypot(x - p[0], y - p[1]);
        }
        return total;
    }
}
