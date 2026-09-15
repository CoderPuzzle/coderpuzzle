#include <vector>

class Solution {
  public:
    std::vector<long long> runningSum(std::vector<long long> &nums) {
        std::vector<long long> result(nums);
        for (size_t i = 1; i < result.size(); ++i) {
            result[i] += result[i - 1];
        }
        return result;
    }
};
