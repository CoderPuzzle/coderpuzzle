#include <vector>

using namespace std;

class Solution {
  public:
    bool isMiddleElementUnique(vector<int> &nums) {
        int middle = nums[nums.size() / 2];
        int count = 0;
        for (int value : nums)
            if (value == middle)
                ++count;
        return count == 1;
    }
};
