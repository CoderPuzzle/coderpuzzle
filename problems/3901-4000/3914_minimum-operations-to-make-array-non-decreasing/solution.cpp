class Solution {
  public:
    long long minOperations(vector<int> &nums) {
        long long total = 0;
        for (int i = 1; i < (int)nums.size(); ++i) {
            if (nums[i - 1] > nums[i])
                total += (long long)nums[i - 1] - nums[i];
        }
        return total;
    }
};
