class Solution {
  public:
    vector<int> findValidElements(vector<int> &nums) {
        vector<int> leftMax = nums;
        for (int i = 1; i < (int)nums.size(); ++i)
            leftMax[i] = max(leftMax[i - 1], nums[i]);
        vector<int> rightMax = nums;
        for (int i = (int)nums.size() - 2; i >= 0; --i)
            rightMax[i] = max(rightMax[i + 1], nums[i]);

        vector<int> valid;
        for (int i = 0; i < (int)nums.size(); ++i) {
            if (i == 0 || i == (int)nums.size() - 1 || nums[i] > leftMax[i - 1] || nums[i] > rightMax[i + 1])
                valid.push_back(nums[i]);
        }
        return valid;
    }
};
