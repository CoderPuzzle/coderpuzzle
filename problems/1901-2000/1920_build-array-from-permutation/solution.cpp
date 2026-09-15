class Solution {
  public:
    vector<int> buildArray(vector<int> &nums) {
        // One pass of nested indexing: nums is a permutation of 0..n-1, so
        // every value is itself a valid index and nums[nums[i]] is in range.
        vector<int> ans;
        ans.reserve(nums.size());
        for (int i = 0; i < (int)nums.size(); ++i) {
            ans.push_back(nums[nums[i]]);
        }
        return ans;
    }
};
