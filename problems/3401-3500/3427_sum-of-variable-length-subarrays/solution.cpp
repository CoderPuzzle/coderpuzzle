class Solution {
  public:
    // Window i covers nums[max(0, i - nums[i]) .. i] inclusive, so a
    // running prefix sum answers each window in O(1) as
    // prefix[i + 1] - prefix[start]. n <= 100 and nums[i] <= 1000 cap
    // the total at 100 windows * 100 elements * 1000 = 10^7, well inside
    // int.
    int subarraySum(vector<int> &nums) {
        int n = nums.size();
        vector<int> prefix(n + 1);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        int total = 0;
        for (int i = 0; i < n; i++) {
            total += prefix[i + 1] - prefix[max(0, i - nums[i])];
        }
        return total;
    }
};
