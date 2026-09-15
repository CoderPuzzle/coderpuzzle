class Solution {

    // Erasing one all-distinct subarray for the highest score is a
    // search for the maximum-sum window with no repeated value. Sweep
    // the right end forward, and while the incoming value is already
    // inside the window, retire elements from the left, dropping their
    // sum. Values lie in [1, 10^4], so a flat count array spots the
    // repeat in constant time, and because every value is positive the
    // longest distinct window ending at each right end is also the
    // richest one there. The total can reach 10^5 * 10^4 = 10^9, barely
    // inside 32 bits, so it is accumulated in a long and narrowed once
    // at the return.
    public int maximumUniqueSubarray(int[] nums) {
        int[] freq = new int[10001];
        int left = 0;
        long windowSum = 0;
        long best = 0;
        for (int value : nums) {
            while (freq[value] > 0) {
                freq[nums[left]]--;
                windowSum -= nums[left];
                left++;
            }
            freq[value]++;
            windowSum += value;
            best = Math.max(best, windowSum);
        }
        return (int) best;
    }
}
