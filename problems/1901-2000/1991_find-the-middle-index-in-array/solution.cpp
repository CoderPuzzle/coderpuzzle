class Solution {
  public:
    int findMiddleIndex(vector<int> &nums) {
        // Single pass with a running left sum: an index is a middle index
        // when left == total - left - nums[i] (the right side's sum).
        int total = 0;
        for (int x : nums)
            total += x;
        int left = 0;
        for (int i = 0; i < (int)nums.size(); ++i) {
            if (left == total - left - nums[i])
                return i;
            left += nums[i];
        }
        return -1;
    }
};
