class Solution {
  public:
    long long countSubarrays(vector<int> &nums) {
        // run counts strictly increasing subarrays ending at the
        // current index: it grows by one while the rise continues,
        // resets to 1 otherwise. Summing counts every subarray exactly
        // once, by its right endpoint.
        long long total = 0;
        long long run = 0;
        for (int i = 0; i < (int)nums.size(); ++i) {
            if (i > 0 && nums[i - 1] < nums[i]) {
                ++run;
            } else {
                run = 1;
            }
            total += run;
        }
        return total;
    }
};
