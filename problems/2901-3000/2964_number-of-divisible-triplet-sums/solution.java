import java.util.HashMap;
import java.util.Map;

class Solution {

    public int divisibleTripletCount(int[] nums, int d) {
        // A triplet sum is divisible by d exactly when a middle element's
        // remainder completes the outer two: fix the left index L, sweep R
        // forward keeping remainder counts of the elements strictly between
        // them, and each lookup of the needed remainder counts every such
        // middle at once. Two-element sums exceed int, so the remainder
        // arithmetic runs in long.
        int count = 0;
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            Map<Integer, Integer> between = new HashMap<>();
            for (int j = i + 1; j < n; j++) {
                int rem = (int) (((long) nums[i] + nums[j]) % d);
                int need = (d - rem) % d;
                count += between.getOrDefault(need, 0);
                between.merge((int) ((long) nums[j] % d), 1, Integer::sum);
            }
        }
        return count;
    }
}
