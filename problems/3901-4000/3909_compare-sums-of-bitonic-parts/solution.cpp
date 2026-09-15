#include <algorithm>
#include <vector>

class Solution {
  public:
    int compareBitonicSums(vector<int> &nums) {
        long long total = 0;
        long long ascending = 0;
        int peak = nums[0];
        for (int index = 0; index < (int)nums.size(); ++index) {
            total += nums[index];
            if (index == 0 || nums[index] > nums[index - 1])
                ascending += nums[index];
            peak = max(peak, nums[index]);
        }
        long long descending = total - ascending + peak;
        if (ascending > descending)
            return 0;
        if (descending > ascending)
            return 1;
        return -1;
    }
};
