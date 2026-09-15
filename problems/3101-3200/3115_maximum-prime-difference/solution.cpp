#include <vector>

class Solution {
  public:
    int maximumPrimeDifference(vector<int> &nums) {
        // One pass keeping the first and the last prime-bearing index; the
        // answer is their distance. Primality by trial division is cheap
        // because values never exceed 100 (at most 9 divisor probes).
        auto isPrime = [](int v) {
            if (v < 2)
                return false;
            for (int d = 2; d * d <= v; ++d) {
                if (v % d == 0)
                    return false;
            }
            return true;
        };
        int first = -1;
        int last = -1;
        for (int i = 0; i < (int)nums.size(); ++i) {
            if (!isPrime(nums[i]))
                continue;
            if (first == -1)
                first = i;
            last = i;
        }
        return last - first;
    }
};
