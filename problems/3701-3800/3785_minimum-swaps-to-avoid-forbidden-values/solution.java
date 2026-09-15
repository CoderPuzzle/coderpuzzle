import java.util.HashMap;
import java.util.Map;

class Solution {

    public int minSwaps(int[] nums, int[] forbidden) {
        // A swap repairs at most two bad positions, and two bad positions
        // sharing a value cannot repair each other, so the answer is at
        // least max(ceil(bad/2), worst same-value cluster). A value whose
        // combined count in nums and forbidden exceeds n has nowhere to
        // hide and makes the task impossible; otherwise both lower bounds
        // are achievable, and their max is the answer.
        int n = nums.length;
        Map<Integer, Integer> freq = new HashMap<>();
        for (int x : nums) {
            freq.merge(x, 1, Integer::sum);
        }
        for (int x : forbidden) {
            freq.merge(x, 1, Integer::sum);
        }
        for (int count : freq.values()) {
            if (count >= n + 1) {
                return -1;
            }
        }
        Map<Integer, Integer> bad = new HashMap<>();
        for (int i = 0; i < n; i++) {
            if (nums[i] == forbidden[i]) {
                bad.merge(nums[i], 1, Integer::sum);
            }
        }
        int total = 0;
        int worst = 0;
        for (int count : bad.values()) {
            total += count;
            worst = Math.max(worst, count);
        }
        return Math.max((total + 1) / 2, worst);
    }
}
