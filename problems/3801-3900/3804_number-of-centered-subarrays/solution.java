import java.util.HashMap;
import java.util.Map;

class Solution {

    public int centeredSubarrays(int[] nums) {
        // Totals stay within 500 * 10^5 = 5 * 10^7 and the count within
        // 125,250, so int arithmetic carries both without overflow.
        int n = nums.length;
        int count = 0;
        // Anchor the left end and grow the right, carrying the window sum
        // and a counter of the values currently inside the window. The
        // window [i..j] is centered exactly when its running total is one
        // of the values the counter holds.
        for (int i = 0; i < n; i++) {
            Map<Integer, Integer> window = new HashMap<>();
            int total = 0;
            for (int j = i; j < n; j++) {
                total += nums[j];
                window.merge(nums[j], 1, Integer::sum);
                if (window.getOrDefault(total, 0) > 0) {
                    count++;
                }
            }
        }
        return count;
    }
}
