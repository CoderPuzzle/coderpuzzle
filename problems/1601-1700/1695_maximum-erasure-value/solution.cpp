class Solution {
  public:
    // Erasing one all-distinct subarray for the highest score is a
    // search for the maximum-sum window with no repeated value. Sweep
    // the right end forward, and while the incoming value is already
    // inside the window, retire elements from the left, dropping their
    // sum. Values lie in [1, 10^4], so a flat count array spots the
    // repeat in constant time, and because every value is positive the
    // longest distinct window ending at each right end is also the
    // richest one there. The total can reach 10^5 * 10^4 = 10^9, barely
    // inside 32 bits, so it is accumulated in a long long and narrowed
    // once at the return.
    int maximumUniqueSubarray(vector<int> &nums) {
        vector<int> freq(10001, 0);
        int left = 0;
        long long windowSum = 0;
        long long best = 0;
        for (int value : nums) {
            while (freq[value] > 0) {
                --freq[nums[left]];
                windowSum -= nums[left];
                ++left;
            }
            ++freq[value];
            windowSum += value;
            best = max(best, windowSum);
        }
        return static_cast<int>(best);
    }
};
