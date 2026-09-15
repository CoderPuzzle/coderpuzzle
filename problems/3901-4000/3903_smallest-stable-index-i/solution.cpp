class Solution {
  public:
    int firstStableIndex(vector<int> &nums, int k) {
        for (int i = 0; i < (int)nums.size(); ++i) {
            int prefixMax = nums[0];
            for (int j = 1; j <= i; ++j)
                prefixMax = max(prefixMax, nums[j]);

            int suffixMin = nums[i];
            for (int j = i + 1; j < (int)nums.size(); ++j)
                suffixMin = min(suffixMin, nums[j]);

            if (prefixMax - suffixMin <= k)
                return i;
        }
        return -1;
    }
};
