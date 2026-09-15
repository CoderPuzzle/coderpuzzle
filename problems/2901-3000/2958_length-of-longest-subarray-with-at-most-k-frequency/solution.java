import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maxSubarrayLength(int[] nums, int k) {
        // Expand the window rightward; only the entering value can break
        // goodness (its own count crosses k), so shrink from the left
        // until one copy of it falls out. Every index enters and leaves
        // the window once, making the whole scan linear.
        Map<Integer, Integer> counts = new HashMap<>();
        int best = 0;
        int left = 0;
        for (int r = 0; r < nums.length; r++) {
            counts.merge(nums[r], 1, Integer::sum);
            while (counts.get(nums[r]) > k) {
                counts.merge(nums[left], -1, Integer::sum);
                if (counts.get(nums[left]) == 0) {
                    counts.remove(nums[left]);
                }
                left++;
            }
            best = Math.max(best, r - left + 1);
        }
        return best;
    }
}
