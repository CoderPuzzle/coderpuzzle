class Solution {

    public int findMaximumLength(int[] nums) {
        // Every reachable array is nums cut into contiguous blocks holding
        // block sums. dp[i] is the most blocks over the first i elements
        // and last[i] the smallest final-block sum among those partitions.
        // A block (j, i] extends partition j when pre[i] - pre[j] >=
        // last[j]. dp never decreases (the previous partition survives
        // merging its final block with the new element), so the best
        // predecessor is the rightmost valid one: keep predecessors on a
        // frontier ordered by pre[j] + last[j], pop entries a later index
        // dominates, and binary-search the largest key <= pre[i]. Prefix
        // sums reach 10^10, so the running totals are 64-bit.
        int n = nums.length;
        long[] pre = new long[n + 1];
        for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];
        int[] dp = new int[n + 1];
        long[] last = new long[n + 1];
        int[] stack = new int[n + 1];
        long[] keys = new long[n + 1];
        int top = 0;
        for (int i = 1; i <= n; i++) {
            int lo = 0,
                hi = top;
            while (lo < hi) {
                int mid = (lo + hi + 1) >>> 1;
                if (keys[mid] <= pre[i]) lo = mid;
                else hi = mid - 1;
            }
            int j = stack[lo];
            dp[i] = dp[j] + 1;
            last[i] = pre[i] - pre[j];
            long key = pre[i] + last[i];
            while (dp[stack[top]] <= dp[i] && keys[top] >= key) top--;
            top++;
            stack[top] = i;
            keys[top] = key;
        }
        return dp[n];
    }
}
