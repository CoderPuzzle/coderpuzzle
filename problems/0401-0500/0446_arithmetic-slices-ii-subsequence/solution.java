import java.util.HashMap;
import java.util.Map;

class Solution {

    public int numberOfArithmeticSlices(int[] nums) {
        int n = nums.length;
        // dp[i][d] = number of arithmetic subsequences of length >= 2 ending
        // at i with common difference d. Hashing per (index, difference)
        // absorbs the huge, possibly negative differences.
        Map<Long, Long>[] dp = new HashMap[n];
        for (int i = 0; i < n; i++) {
            dp[i] = new HashMap<>();
        }
        long total = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                long d = (long) nums[i] - (long) nums[j];
                long cnt = dp[j].getOrDefault(d, 0L);
                // Each length >= 2 subsequence ending at j extends by nums[i]
                // into a slice of length >= 3, counted once at its last
                // element.
                total += cnt;
                // cnt extensions plus the new length-2 pair (j, i) itself;
                // pairs of exactly length 2 reach the total only via
                // extension.
                dp[i].merge(d, cnt + 1, Long::sum);
            }
        }
        return (int) total;
    }
}
