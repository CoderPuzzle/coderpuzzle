#include <cmath>
#include <vector>

class Solution {
  public:
    int numPoints(std::vector<std::vector<int>> &darts, int r) {
        int n = (int)darts.size();
        int best = 1;
        double r2 = (double)r * r;
        double eps = 1e-7;
        auto countAt = [&](double cx, double cy) {
            int count = 0;
            for (const std::vector<int> &dart : darts) {
                double dx = dart[0] - cx;
                double dy = dart[1] - cy;
                if (dx * dx + dy * dy <= r2 + eps) {
                    count++;
                }
            }
            return count;
        };
        for (int i = 0; i < n; i++) {
            best = std::max(best, countAt(darts[i][0], darts[i][1]));
        }
        for (int i = 0; i < n; i++) {
            double x1 = darts[i][0], y1 = darts[i][1];
            for (int j = i + 1; j < n; j++) {
                double x2 = darts[j][0], y2 = darts[j][1];
                double dx = x2 - x1, dy = y2 - y1;
                double d2 = dx * dx + dy * dy;
                if (d2 == 0 || d2 > 4 * r2) {
                    continue;
                }
                double h2 = r2 - d2 / 4.0;
                if (h2 < 0) {
                    h2 = 0;
                }
                double scale = std::sqrt(h2 / d2);
                double mx = (x1 + x2) / 2.0, my = (y1 + y2) / 2.0;
                for (double factor : {1.0, -1.0}) {
                    best = std::max(best, countAt(mx + factor * scale * -dy, my + factor * scale * dx));
                }
            }
        }
        return best;
    }
};
