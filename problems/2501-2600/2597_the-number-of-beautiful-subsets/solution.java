import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int beautifulSubsets(int[] nums, int k) {
        // Sort, then decide each element take-or-skip in index order.
        // Taking nums[i] is legal exactly when no earlier-taken value
        // equals nums[i] - k — the only conflict a sorted order can
        // create; a counter map tracks how often each taken value
        // occurs (duplicates never clash with each other since k >= 1).
        // Every take/skip leaf is one subset selection; drop the empty
        // one at the end. The answer is at most 2^18 - 1 = 262143.
        Arrays.sort(nums);
        return countFrom(nums, k, new HashMap<>(), 0) - 1;
    }

    private int countFrom(int[] nums, int k, Map<Integer, Integer> taken, int i) {
        if (i == nums.length) {
            return 1;
        }
        int total = countFrom(nums, k, taken, i + 1);
        if (taken.getOrDefault(nums[i] - k, 0) == 0) {
            taken.merge(nums[i], 1, Integer::sum);
            total += countFrom(nums, k, taken, i + 1);
            taken.merge(nums[i], -1, Integer::sum);
        }
        return total;
    }
}
