import java.util.HashMap;
import java.util.Map;

class Solution {

    public int longestSubarray(int[] nums, int k) {
        // freq counts occurrences of each value inside the window; dup counts
        // how many values have been seen twice or more.
        Map<Integer, Integer> freq = new HashMap<>();
        int dup = 0,
            left = 0,
            best = 0;
        for (int right = 0; right < nums.length; right++) {
            freq.merge(nums[right], 1, Integer::sum);
            if (freq.get(nums[right]) == 2) {
                dup++;
            }
            // Grow past k repeating values and the window must give ground
            // until one of them is fully evicted again.
            while (dup > k) {
                if (freq.merge(nums[left], -1, Integer::sum) == 1) {
                    dup--;
                }
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
