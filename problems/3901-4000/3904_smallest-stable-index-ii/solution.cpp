class Solution {
  public:
    int firstStableIndex(vector<int> &nums, int k) {
        vector<int> suffixMin = nums;
        for (int i = (int)nums.size() - 2; i >= 0; --i)
            suffixMin[i] = min(nums[i], suffixMin[i + 1]);

        int prefixMax = nums[0];
        for (int i = 0; i < (int)nums.size(); ++i) {
            prefixMax = max(prefixMax, nums[i]);
            if (prefixMax - suffixMin[i] <= k)
                return i;
        }
        return -1;
    }
};
