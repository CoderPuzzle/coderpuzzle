class Solution {
  public:
    int partitionArray(vector<int> &nums, int k) {
        sort(nums.begin(), nums.end());
        int groups = 1;
        int start = nums[0];
        for (int value : nums) {
            if (value - start > k) {
                groups++;
                start = value;
            }
        }
        return groups;
    }
};
