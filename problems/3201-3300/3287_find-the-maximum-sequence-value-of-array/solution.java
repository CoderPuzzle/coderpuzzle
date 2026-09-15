class Solution {

    public int maxValue(int[] nums, int k) {
        int n = nums.length;
        final int V = 128; // nums[i] < 2^7, OR values stay below 128

        // pre[j] = ORs of exactly k elements from first j elements
        boolean[][] pre = new boolean[n + 1][V];
        {
            boolean[][] dp = new boolean[k + 1][V];
            dp[0][0] = true;
            for (int i = 0; i < n; i++) {
                int x = nums[i];
                int top = Math.min(i + 1, k);
                for (int c = top; c >= 1; c--) {
                    boolean[] src = dp[c - 1];
                    boolean[] dst = dp[c];
                    for (int m = 0; m < V; m++) {
                        if (src[m]) {
                            dst[m | x] = true;
                        }
                    }
                }
                pre[i + 1] = dp[k].clone();
            }
        }

        // suf[i] = ORs of exactly k elements from nums[i:]
        boolean[][] suf = new boolean[n + 1][V];
        {
            boolean[][] dp = new boolean[k + 1][V];
            dp[0][0] = true;
            for (int i = n - 1; i >= 0; i--) {
                int x = nums[i];
                int top = Math.min(n - i, k);
                for (int c = top; c >= 1; c--) {
                    boolean[] src = dp[c - 1];
                    boolean[] dst = dp[c];
                    for (int m = 0; m < V; m++) {
                        if (src[m]) {
                            dst[m | x] = true;
                        }
                    }
                }
                suf[i] = dp[k].clone();
            }
        }

        int ans = 0;
        for (int i = k; i <= n - k; i++) {
            for (int a = 0; a < V; a++) {
                if (!pre[i][a]) {
                    continue;
                }
                for (int b = 0; b < V; b++) {
                    if (suf[i][b]) {
                        int v = a ^ b;
                        if (v > ans) {
                            ans = v;
                        }
                    }
                }
            }
        }
        return ans;
    }
}
