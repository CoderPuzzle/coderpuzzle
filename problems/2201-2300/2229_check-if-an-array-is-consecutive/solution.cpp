class Solution {
  public:
    bool isConsecutive(vector<int> &nums) {
        sort(nums.begin(), nums.end());
        for (size_t i = 1; i < nums.size(); i++) {
            if (nums[i] - nums[i - 1] != 1) {
                return false;
            }
        }
        return true;
    }
};
