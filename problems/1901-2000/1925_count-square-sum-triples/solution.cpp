#include <cmath>
#include <vector>

class Solution {
  public:
    int countTriples(int n) {
        // Each ordered pair (a, b) contributes one triple iff a^2 + b^2 is a
        // perfect square c^2 with c <= n. Rounding sqrt and re-squaring keeps
        // the check on the integer side, immune to float drift.
        int count = 0;
        for (int a = 1; a <= n; ++a) {
            for (int b = 1; b <= n; ++b) {
                int s = a * a + b * b;
                int r = static_cast<int>(std::sqrt(static_cast<double>(s)) + 0.5);
                if (r <= n && r * r == s) {
                    ++count;
                }
            }
        }
        return count;
    }
};
