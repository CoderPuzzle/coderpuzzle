#include <vector>

class Solution {
  public:
    std::vector<long long> maximumEvenSplit(long long finalSum) {
        // An odd total can never be a sum of even numbers. Take the
        // smallest evens while the leftover allows a strictly larger final
        // part. finalSum reaches 10^10, so long long carries it.
        if (finalSum % 2 != 0) {
            return {};
        }
        std::vector<long long> parts;
        long long take = 2;
        long long remaining = finalSum;
        while (remaining - take > take) {
            parts.push_back(take);
            remaining -= take;
            take += 2;
        }
        parts.push_back(remaining);
        return parts;
    }
};
