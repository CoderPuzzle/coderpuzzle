class Solution {
  public:
    int triangularSum(vector<int> &nums) {
        for (int length = nums.size(); length > 1; length--) {
            for (int i = 0; i + 1 < length; i++) {
                nums[i] = (nums[i] + nums[i + 1]) % 10;
            }
        }
        return nums[0];
    }
};
