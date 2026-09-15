#include <vector>

class Solution {
  public:
    std::vector<long long> sumOfThree(long long num) {
        // Three consecutive integers x-1, x, x+1 sum to exactly 3x, so a
        // triple exists iff num is a multiple of 3. num reaches 10^15,
        // which only fits in long long.
        if (num % 3 != 0) {
            return {};
        }
        long long mid = num / 3;
        return {mid - 1, mid, mid + 1};
    }
};
