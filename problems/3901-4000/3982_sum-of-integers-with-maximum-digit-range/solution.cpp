#include <algorithm>
#include <vector>

using namespace std;

class Solution {
  public:
    long long maxDigitRange(vector<int> &nums) {
        vector<int> ranges(nums.size());
        int maximum = 0;
        for (int i = 0; i < (int)nums.size(); ++i) {
            int remaining = nums[i];
            int low = 9, high = 0;
            while (remaining > 0) {
                int digit = remaining % 10;
                low = min(low, digit);
                high = max(high, digit);
                remaining /= 10;
            }
            ranges[i] = high - low;
            maximum = max(maximum, ranges[i]);
        }
        long long answer = 0;
        for (int i = 0; i < (int)nums.size(); ++i)
            if (ranges[i] == maximum)
                answer += nums[i];
        return answer;
    }
};
