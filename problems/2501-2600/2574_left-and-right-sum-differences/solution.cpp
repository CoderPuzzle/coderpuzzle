#include <cstdlib>
#include <vector>

class Solution {
  public:
    vector<int> leftRightDifference(vector<int> &nums) {
        // rightSum[i] is just total - leftSum[i] - nums[i], so one running
        // prefix replaces both arrays: pay one pass for the total, then a
        // second that walks left forward and emits each absolute
        // difference.
        long long total = 0;
        for (int value : nums) {
            total += value;
        }
        vector<int> answer;
        long long left = 0;
        for (int value : nums) {
            long long diff = left - (total - left - value);
            if (diff < 0)
                diff = -diff;
            answer.push_back(static_cast<int>(diff));
            left += value;
        }
        return answer;
    }
};
