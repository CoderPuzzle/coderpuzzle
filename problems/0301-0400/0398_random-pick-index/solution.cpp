#include <random>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    Solution(std::vector<int> nums) {
        // One pass buckets the indices of every value; pick(target)
        // draws one of that value's index buckets uniformly, so each
        // qualifying index is exactly equally likely.
        for (int index = 0; index < (int)nums.size(); index++) {
            positions[nums[index]].push_back(index);
        }
    }

    int pick(int target) {
        std::vector<int> &indices = positions[target];
        return indices[std::uniform_int_distribution<int>(0, (int)indices.size() - 1)(generator)];
    }

  private:
    std::unordered_map<int, std::vector<int>> positions;
    std::mt19937 generator{std::random_device{}()};
};
