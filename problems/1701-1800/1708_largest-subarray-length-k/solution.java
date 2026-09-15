import java.util.Arrays;

class Solution {

    public int[] largestSubarray(int[] nums, int k) {
        // Distinct values mean two length-k windows never tie: their first
        // elements differ, and the comparison is decided at index 0 by that
        // pair alone. The answer is therefore the window starting at the
        // maximum of nums[0..n-k] — one scan for that position, then take
        // the k elements from it.
        int best = 0;
        for (int i = 1; i + k <= nums.length; i++) {
            if (nums[i] > nums[best]) {
                best = i;
            }
        }
        return Arrays.copyOfRange(nums, best, best + k);
    }
}
