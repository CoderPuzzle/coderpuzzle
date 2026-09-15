import java.util.*;

class Solution {

    // Pair sorted extremes: nums[i] with nums[n-1-i]. An exchange
    // argument shows this minimizes the largest pair sum.
    public long minPairSum(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        long best = 0;
        for (int i = 0; i + i < n; i++) {
            best = Math.max(best, (long) nums[i] + nums[n - 1 - i]);
        }
        return best;
    }
}
