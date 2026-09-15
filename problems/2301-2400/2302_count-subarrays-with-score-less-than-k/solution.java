class Solution {

    // Scores grow with every extension: appending x to a window with sum s
    // and length l changes the score by s + x*l + x > 0 (all elements are
    // >= 1), so valid windows for a fixed right endpoint form a suffix that
    // only shrinks as right advances. The sum reaches n * max = 10^10, past
    // int range, so it accumulates in a long; no score exceeds 10^10 * 10^5
    // = 10^15, far below the ~9.2 * 10^18 long ceiling (int * long promotes
    // before multiplying).
    public long countSubarrays(int[] nums, long k) {
        long total = 0;
        long windowSum = 0;
        int left = 0;
        for (int right = 0; right < nums.length; right++) {
            windowSum += nums[right];
            while (windowSum * (right - left + 1) >= k) {
                windowSum -= nums[left];
                left++;
            }
            // The window is now the longest qualifying subarray ending at
            // right; every shorter suffix qualifies too.
            total += right - left + 1;
        }
        return total;
    }
}
