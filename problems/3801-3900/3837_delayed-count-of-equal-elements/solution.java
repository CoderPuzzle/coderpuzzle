import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] delayedCount(int[] nums, int k) {
        // Sweep i from the right; freq counts occurrences of each value in
        // the window [i + k + 1, n - 1], so stepping i down inserts exactly
        // nums[i + k + 1] and the delayed count is a single lookup.
        int n = nums.length;
        int[] ans = new int[n];
        Map<Integer, Integer> freq = new HashMap<>();
        for (int i = n - 1; i >= 0; i--) {
            int ahead = i + k + 1;
            if (ahead < n) {
                freq.merge(nums[ahead], 1, Integer::sum);
            }
            ans[i] = freq.getOrDefault(nums[i], 0);
        }
        return ans;
    }
}
