class Solution {
  public:
    // Scores grow with every extension: appending x to a window with sum s
    // and length l changes the score by s + x*l + x > 0 (all elements are
    // >= 1), so valid windows for a fixed right endpoint form a suffix that
    // only shrinks as right advances. The sum reaches n * max = 10^10, past
    // int range, so it lives in long long; no score exceeds 10^10 * 10^5 =
    // 10^15, far below the ~9.2 * 10^18 long long ceiling.
    long long countSubarrays(vector<int> &nums, long long k) {
        long long total = 0;
        long long window_sum = 0;
        int left = 0;
        for (int right = 0; right < static_cast<int>(nums.size()); ++right) {
            window_sum += nums[right];
            while (window_sum * (right - left + 1) >= k) {
                window_sum -= nums[left];
                ++left;
            }
            // The window is now the longest qualifying subarray ending at
            // right; every shorter suffix qualifies too. The length factor
            // is an int, promoted before multiplying the long long sum.
            total += right - left + 1;
        }
        return total;
    }
};
