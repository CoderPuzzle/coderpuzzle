#include <vector>

class Solution {
  public:
    bool validPartition(vector<int> &nums) {
        // ok[i] = the prefix nums[:i] has a valid partition; its final block
        // is a good pair or good triple, leaving a shorter prefix whose
        // validity is ok[i-2] / ok[i-3]. Single forward pass.
        int n = static_cast<int>(nums.size());
        vector<char> ok(n + 1, 0);
        ok[0] = 1;
        for (int i = 2; i <= n; ++i) {
            if (nums[i - 1] == nums[i - 2]) {
                ok[i] = ok[i] || ok[i - 2];
            }
            if (i >= 3) {
                if (nums[i - 1] == nums[i - 2] && nums[i - 2] == nums[i - 3]) {
                    ok[i] = ok[i] || ok[i - 3];
                } else if (nums[i - 2] - nums[i - 3] == 1 && nums[i - 1] - nums[i - 2] == 1) {
                    ok[i] = ok[i] || ok[i - 3];
                }
            }
        }
        return ok[n] != 0;
    }
};
