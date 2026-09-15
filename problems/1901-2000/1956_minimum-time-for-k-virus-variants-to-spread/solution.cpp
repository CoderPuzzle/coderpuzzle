class Solution {
  public:
    int minDayskVariants(vector<vector<int>> &points, int k) {
        // At day t a variant reaches exactly the L1 ball of radius t around
        // its origin, so the answer is min over every lattice point p of the
        // k-th smallest L1 distance from p to the n origins. Any point
        // outside the bounding box can be projected onto the box, which only
        // shrinks every distance, so the minimizer lies inside it. With
        // coordinates bounded by 100 the box has at most 100*100 points and
        // n <= 50, so sorting the n distances per point is cheap.
        int minX = INT_MAX, maxX = INT_MIN, minY = INT_MAX, maxY = INT_MIN;
        for (auto &p : points) {
            minX = min(minX, p[0]);
            maxX = max(maxX, p[0]);
            minY = min(minY, p[1]);
            maxY = max(maxY, p[1]);
        }
        int best = INT_MAX;
        for (int x = minX; x <= maxX; x++) {
            for (int y = minY; y <= maxY; y++) {
                vector<int> dists;
                for (auto &p : points) {
                    dists.push_back(abs(x - p[0]) + abs(y - p[1]));
                }
                sort(dists.begin(), dists.end());
                best = min(best, dists[k - 1]);
            }
        }
        return best;
    }
};
