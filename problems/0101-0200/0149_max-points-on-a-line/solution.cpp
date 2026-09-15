class Solution {
  public:
    // Anchor each point in turn and bucket every later point by the
    // direction from the anchor: on any one line through the anchor all
    // other members share that direction, and the best line is counted
    // in full when the anchor is its earliest point.
    int maxPoints(vector<vector<int>> &points) {
        int best = 1;
        for (int i = 0; i < (int)points.size(); ++i) {
            unordered_map<long long, int> counts;
            for (int j = i + 1; j < (int)points.size(); ++j) {
                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];
                // Reduce to lowest terms, then canonicalize the sign so the
                // two readings of one line collapse onto a single key:
                // exact integers, never a floating-point slope.
                int g = gcd(dx, dy);
                dx /= g;
                dy /= g;
                if (dx < 0 || (dx == 0 && dy < 0)) {
                    dx = -dx;
                    dy = -dy;
                }
                // A reduced |dy| stays below 2 * 10^4, far under the
                // multiplier, so packing the pair into one long cannot collide.
                counts[(long long)dx * 1000000 + dy]++;
            }
            for (auto &[direction, count] : counts)
                best = max(best, 1 + count);
        }
        return best;
    }

    // Euclid's algorithm on absolute values, so it also reduces directions
    // that point down or left.
    int gcd(int a, int b) {
        if (a < 0) {
            a = -a;
        }
        if (b < 0) {
            b = -b;
        }
        while (b != 0) {
            int remainder = a % b;
            a = b;
            b = remainder;
        }
        return a;
    }
};
