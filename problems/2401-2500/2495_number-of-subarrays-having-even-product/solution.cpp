#include <vector>

class Solution {
  public:
    long long evenProduct(vector<int> &nums) {
        // A subarray has an even product iff it contains at least one even
        // element. Sweep the right endpoint left to right, remembering the
        // most recent even element's index: every left endpoint up to and
        // including it contributes lastEven + 1 even-product subarrays
        // ending here. The maximum n(n+1)/2 overflows int, hence long long.
        long long answer = 0;
        int lastEven = -1;
        for (int i = 0; i < (int)nums.size(); ++i) {
            if (nums[i] % 2 == 0) {
                lastEven = i;
            }
            answer += lastEven + 1;
        }
        return answer;
    }
};
