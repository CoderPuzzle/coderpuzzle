#include <algorithm>
#include <utility>
#include <vector>

class Solution {
  public:
    int maxFixedPoints(std::vector<int> &nums) {
        std::vector<std::pair<int, int>> candidates;
        for (int i = 0; i < (int)nums.size(); ++i) {
            if (nums[i] <= i)
                candidates.push_back({nums[i], i - nums[i]});
        }
        std::sort(candidates.begin(), candidates.end());
        std::vector<int> bit(nums.size() + 1, 0);
        auto query = [&](int index) {
            int best = 0;
            for (++index; index > 0; index -= index & -index)
                best = std::max(best, bit[index]);
            return best;
        };
        auto update = [&](int index, int value) {
            for (++index; index < (int)bit.size(); index += index & -index)
                bit[index] = std::max(bit[index], value);
        };

        int answer = 0;
        for (int start = 0; start < (int)candidates.size();) {
            int end = start;
            std::vector<std::pair<int, int>> pending;
            while (end < (int)candidates.size() && candidates[end].first == candidates[start].first) {
                int deletionCount = candidates[end].second;
                int length = query(deletionCount) + 1;
                pending.push_back({deletionCount, length});
                answer = std::max(answer, length);
                ++end;
            }
            for (auto [deletionCount, length] : pending)
                update(deletionCount, length);
            start = end;
        }
        return answer;
    }
};
