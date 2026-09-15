class Solution {
  public:
    int findNonMinOrMax(vector<int> &nums) {
        if (nums.size() < 3) {
            return -1;
        }
        int sum = nums[0] + nums[1] + nums[2];
        int lo = min(min(nums[0], nums[1]), nums[2]);
        int hi = max(max(nums[0], nums[1]), nums[2]);
        return sum - lo - hi;
    }
};
