import java.util.*;

class Solution {

    public long maxResult(int[] nums, int k) {
        int n = nums.length;
        long[] dp = new long[n];
        dp[0] = nums[0];
        Deque<Integer> window = new ArrayDeque<>();
        window.add(0);
        // The deque holds indices with strictly decreasing dp values; it turns
        // dp[i] = nums[i] + max(dp[i-k .. i-1]) into a sliding-window maximum
        // answered in amortized O(1) per step.
        for (int i = 1; i < n; i++) {
            // Expire front indices that left the [i-k, i-1] hop window; the
            // front is then exactly the window's maximum.
            while (window.peekFirst() < i - k) {
                window.pollFirst();
            }
            dp[i] = nums[i] + dp[window.peekFirst()];
            // Back entries with dp <= dp[i] can never be a window max again
            // while i is alive; <= also collapses equal scores.
            while (!window.isEmpty() && dp[window.peekLast()] <= dp[i]) {
                window.pollLast();
            }
            window.add(i);
        }
        return dp[n - 1];
    }
}
