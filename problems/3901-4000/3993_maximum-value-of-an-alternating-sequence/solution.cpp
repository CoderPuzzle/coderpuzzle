#include <algorithm>

class Solution {
  public:
    long long maximumValue(int n, int s, int m) {
        if (n == 1)
            return s;
        long long highCount = n / 2LL;
        long long increaseFirst = s + (long long)m + (highCount - 1) * (m - 1LL);
        long long decreaseFirst = s + (long long)m - 1 + (highCount - 1) * (m - 1LL);
        return max(increaseFirst, decreaseFirst);
    }
};
