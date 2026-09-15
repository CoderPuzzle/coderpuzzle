import java.util.Arrays;

class Solution {

    public int minRemoval(int[] nums, int k) {
        // Sort so the best survivor set is a contiguous window: it is
        // balanced exactly when nums[j] <= nums[i] * k at its ends, and the
        // longest such window keeps the most elements.
        Arrays.sort(nums);
        int best = 0;
        int left = 0;
        for (int right = 0; right < nums.length; right++) {
            // A one-element window is always balanced, so left never passes
            // right. The product reaches 1e14 — beyond int range, so widen
            // before multiplying.
            while ((long) nums[right] > (long) nums[left] * k) {
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return nums.length - best;
    }
}
