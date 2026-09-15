import java.util.HashSet;
import java.util.Set;

class Solution {

    // Deletions are free, so the chosen subarray is really a set of
    // distinct values: keep every positive value once, and when no
    // positive exists the best set is the single largest element.
    public int maxSum(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        int total = 0;
        int largest = nums[0];
        for (int v : nums) {
            largest = Math.max(largest, v);
            if (v > 0 && seen.add(v)) {
                total += v;
            }
        }
        return seen.isEmpty() ? largest : total;
    }
}
