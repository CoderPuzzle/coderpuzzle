class Solution {

    public int minChanges(int[] nums, int k) {
        // dp[x] holds the fewest changes among the residue classes handled
        // so far when the chosen class values XOR to x. Values are below
        // 2^10, so 1024 states cover every reachable XOR.
        int inf = 1 << 20;
        int[] dp = new int[1024];
        for (int x = 0; x < 1024; ++x) {
            dp[x] = inf;
        }
        dp[0] = 0;
        for (int r = 0; r < k; ++r) {
            int size = 0;
            int[] count = new int[1024];
            for (int i = r; i < nums.length; i += k) {
                ++count[nums[i]];
                ++size;
            }
            // Rewriting a whole class costs its full size and leaves its
            // value free, so every state is reachable at best; keeping a
            // value that already occurs can only improve on that.
            int best = inf;
            for (int x = 0; x < 1024; ++x) {
                if (dp[x] < best) {
                    best = dp[x];
                }
            }
            best += size;
            int[] nxt = new int[1024];
            for (int x = 0; x < 1024; ++x) {
                nxt[x] = best;
            }
            for (int v = 0; v < 1024; ++v) {
                int c = count[v];
                if (c == 0) {
                    continue;
                }
                int cost = size - c;
                for (int u = 0; u < 1024; ++u) {
                    int t = dp[u] + cost;
                    int w = u ^ v;
                    if (t < nxt[w]) {
                        nxt[w] = t;
                    }
                }
            }
            dp = nxt;
        }
        return dp[0];
    }
}
