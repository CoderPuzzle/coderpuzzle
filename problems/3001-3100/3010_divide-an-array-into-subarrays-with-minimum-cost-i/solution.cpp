class Solution {
  public:
    int minimumCost(vector<int> &nums) {
        int smallest = min(nums[1], nums[2]);
        int second = max(nums[1], nums[2]);
        for (int index = 3; index < static_cast<int>(nums.size()); index++) {
            int value = nums[index];
            if (value < smallest) {
                second = smallest;
                smallest = value;
            } else if (value < second) {
                second = value;
            }
        }
        return nums[0] + smallest + second;
    }
};
