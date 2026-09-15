class Solution {
  public:
    int minSubArrayLen(int target, vector<int> &nums) {
        int n = nums.size();
        // Sentinel: an impossible length that survives when target is never met.
        int best = n + 1;
        long long window = 0;
        int left = 0;
        for (int right = 0; right < n; right++) {
            window += nums[right];
            // Positive elements make the window sum monotone under both
            // pointer moves, so the smallest left end for each right only
            // moves rightward — both pointers make at most n steps.
            while (window >= target) {
                best = min(best, right - left + 1);
                // Shrink from the left to reach the minimal window ending
                // here and leave the leanest state for the next extension.
                window -= nums[left];
                left++;
            }
        }
        return best == n + 1 ? 0 : best;
    }
};
