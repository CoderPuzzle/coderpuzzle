import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int countPartitions(int[] nums, int k) {
        // dp[i + 1] = ways to partition the first i + 1 elements. The last
        // segment is nums[j..i] for some start j; valid starts form a
        // contiguous range ending at i, grown by lowering lo until the
        // window spread is <= k. Monotonic deques expose the window
        // min/max, pre holds prefix sums of dp so a range sum is one
        // subtraction.
        final long MOD = 1_000_000_007L;
        int n = nums.length;
        long[] dp = new long[n + 1];
        long[] pre = new long[n + 2];
        dp[0] = 1;
        pre[1] = 1;
        int lo = 0;
        Deque<Integer> mins = new ArrayDeque<>(); // values increasing
        Deque<Integer> maxs = new ArrayDeque<>(); // values decreasing
        for (int i = 0; i < n; i++) {
            while (!mins.isEmpty() && nums[mins.peekLast()] >= nums[i]) mins.pollLast();
            mins.addLast(i);
            while (!maxs.isEmpty() && nums[maxs.peekLast()] <= nums[i]) maxs.pollLast();
            maxs.addLast(i);
            while (nums[maxs.peekFirst()] - nums[mins.peekFirst()] > k) {
                if (mins.peekFirst() == lo) mins.pollFirst();
                if (maxs.peekFirst() == lo) maxs.pollFirst();
                lo++;
            }
            dp[i + 1] = (pre[i + 1] - pre[lo] + MOD) % MOD;
            pre[i + 2] = (pre[i + 1] + dp[i + 1]) % MOD;
        }
        return (int) dp[n];
    }
}
