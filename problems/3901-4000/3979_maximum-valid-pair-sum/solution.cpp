#include <algorithm>
#include <vector>

using namespace std;

class Solution {
  public:
    long long maxValidPairSum(vector<int> &nums, int k) {
        long long bestLeft = nums[0];
        long long answer = -4e18;
        for (int j = k; j < (int)nums.size(); ++j) {
            bestLeft = max(bestLeft, (long long)nums[j - k]);
            answer = max(answer, bestLeft + nums[j]);
        }
        return answer;
    }
};
