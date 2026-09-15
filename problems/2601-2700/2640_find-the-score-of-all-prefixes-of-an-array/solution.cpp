#include <vector>

class Solution {
  public:
    vector<long long> findPrefixScore(vector<int> &nums) {
        // ans is the prefix sum of the conversion array, so one fused pass
        // keeps a running max and a running total, never storing conver
        // itself. Conversion values reach 2*10^9 and totals 2*10^14, both
        // past int range, so everything runs in long long.
        vector<long long> result;
        result.reserve(nums.size());
        long long running_max = 0;
        long long total = 0;
        for (int value : nums) {
            running_max = max<long long>(running_max, value);
            total += value + running_max;
            result.push_back(total);
        }
        return result;
    }
};
