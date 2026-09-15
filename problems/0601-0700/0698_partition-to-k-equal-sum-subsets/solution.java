import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean canPartitionKSubsets(int[] nums, int k) {
        long total = 0;
        for (int v : nums) total += v;
        if (total % k != 0) {
            return false;
        }
        int target = (int) (total / k);
        nums = nums.clone();
        // Largest elements are hardest to place; descending order prunes early.
        Arrays.sort(nums);
        // descending
        for (int i = 0, j = nums.length - 1; i < j; i++, j--) {
            int t = nums[i];
            nums[i] = nums[j];
            nums[j] = t;
        }
        if (nums[0] > target) {
            return false;
        }
        int n = nums.length;
        int full = (1 << n) - 1;
        Map<Long, Boolean> memo = new HashMap<>();
        return dfs(nums, target, full, 0, 0, memo);
    }

    private boolean dfs(int[] nums, int target, int full, int mask, int curr, Map<Long, Boolean> memo) {
        // State: bitmask of placed elements plus curr, the partial sum of the
        // subset currently being filled.
        if (mask == full) {
            return true;
        }
        // Subset complete: start the next one from zero.
        if (curr == target) {
            return dfs(nums, target, full, mask, 0, memo);
        }
        long key = (long) mask * (target + 1) + curr;
        Boolean cached = memo.get(key);
        if (cached != null) {
            return cached;
        }
        // Try every unused element that still fits under the target.
        for (int i = 0; i < nums.length; i++) {
            if (((mask >> i) & 1) == 0 && curr + nums[i] <= target) {
                if (dfs(nums, target, full, mask | (1 << i), curr + nums[i], memo)) {
                    memo.put(key, true);
                    return true;
                }
            }
        }
        memo.put(key, false);
        return false;
    }
}
