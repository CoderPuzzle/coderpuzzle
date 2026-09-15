#include <vector>

class Solution {
  public:
    std::vector<int> findDiagonalOrder(std::vector<std::vector<int>> &nums) {
        std::vector<std::vector<int>> buckets;
        for (int i = 0; i < (int)nums.size(); i++) {
            for (int j = 0; j < (int)nums[i].size(); j++) {
                int key = i + j;
                if ((int)buckets.size() <= key) {
                    buckets.resize(key + 1);
                }
                buckets[key].push_back(nums[i][j]);
            }
        }
        std::vector<int> result;
        for (const std::vector<int> &bucket : buckets) {
            for (int i = (int)bucket.size() - 1; i >= 0; i--) {
                result.push_back(bucket[i]);
            }
        }
        return result;
    }
};
