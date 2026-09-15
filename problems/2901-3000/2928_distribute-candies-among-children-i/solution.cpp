#include <algorithm>

class Solution {
  public:
    int distributeCandies(int n, int limit) {
        // Fix the first child's share, then the other two just need b + c
        // = rest with both halves capped: the valid b values form the
        // consecutive range [max(0, rest - limit), min(limit, rest)]. The
        // count never exceeds C(52, 2) = 1326, well inside int range.
        int total = 0;
        int upper = std::min(n, limit);
        for (int first = 0; first <= upper; ++first) {
            int rest = n - first;
            int low = std::max(0, rest - limit);
            int high = std::min(limit, rest);
            if (high >= low) {
                total += high - low + 1;
            }
        }
        return total;
    }
};
