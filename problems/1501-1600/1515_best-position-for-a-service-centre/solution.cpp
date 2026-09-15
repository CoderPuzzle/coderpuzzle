class Solution {
  public:
    double getMinDistSum(vector<vector<int>> &positions) {
        double n = (double)positions.size();
        // start from the centroid, a reasonable first guess for the median
        double x = 0, y = 0;
        for (const auto &p : positions) {
            x += p[0];
            y += p[1];
        }
        x /= n;
        y /= n;
        const double eps = 1e-9; // keeps the weight finite if the guess lands on a customer
        for (int it = 0; it < 300; it++) {
            double numX = 0, numY = 0, weightSum = 0;
            for (const auto &p : positions) {
                double px = p[0], py = p[1];
                double distance = hypot(x - px, y - py) + eps;
                double weight = 1.0 / distance;
                numX += weight * px;
                numY += weight * py;
                weightSum += weight;
            }
            x = numX / weightSum;
            y = numY / weightSum;
        }
        double total = 0;
        for (const auto &p : positions) {
            total += hypot(x - p[0], y - p[1]);
        }
        return total;
    }
};
