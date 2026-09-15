class Solution {
  public:
    vector<int> constructTransformedArray(vector<int> &nums) {
        // Each entry is independent: land |nums[i]| steps from i in the
        // direction of its sign. The one-shot landing index
        // ((i + nums[i]) % n + n) % n folds leftward (negative) offsets back
        // into range; a step of zero stays on i, matching the nums[i] == 0
        // rule without a special case.
        int n = (int)nums.size();
        vector<int> result(n);
        for (int i = 0; i < n; ++i) {
            result[i] = nums[((i + nums[i]) % n + n) % n];
        }
        return result;
    }
};
