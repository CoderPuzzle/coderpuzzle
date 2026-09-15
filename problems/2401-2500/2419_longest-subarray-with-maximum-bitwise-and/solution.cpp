class Solution {
  public:
    int longestSubarray(vector<int> &nums) {
        // AND never exceeds any member, so the maximum subarray AND is
        // max(nums), and only subarrays made entirely of that value attain
        // it: adding anything smaller strictly lowers the AND. The answer
        // is therefore the longest run of consecutive occurrences of the
        // maximum.
        int target = *max_element(nums.begin(), nums.end());
        int best = 0, run = 0;
        for (int num : nums) {
            if (num == target) {
                best = max(best, ++run);
            } else {
                run = 0;
            }
        }
        return best;
    }
};
