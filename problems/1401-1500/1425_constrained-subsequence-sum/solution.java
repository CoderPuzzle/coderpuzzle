class Solution {

    public int constrainedSubsetSum(int[] nums, int k) {
        int n = nums.length;
        long[] dp = new long[n];
        int[] dq = new int[n];
        int head = 0,
            tail = 0;
        long best = Long.MIN_VALUE;
        for (int i = 0; i < n; i++) {
            while (head < tail && dq[head] < i - k) {
                head++;
            }
            long prev = head < tail ? dp[dq[head]] : 0;
            if (prev < 0) {
                prev = 0;
            }
            dp[i] = nums[i] + prev;
            while (head < tail && dp[dq[tail - 1]] <= dp[i]) {
                tail--;
            }
            dq[tail++] = i;
            if (dp[i] > best) {
                best = dp[i];
            }
        }
        return (int) best;
    }
}
