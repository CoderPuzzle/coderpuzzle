class Solution {
  public:
    int minChanges(vector<int> &nums, int k) {
        // dp[x] holds the fewest changes among the residue classes handled
        // so far when the chosen class values XOR to x. Values are below
        // 2^10, so 1024 states cover every reachable XOR.
        const int X = 1024;
        const int INF = 1 << 20;
        vector<int> dp(X, INF);
        dp[0] = 0;
        for (int r = 0; r < k; ++r) {
            int size = 0;
            vector<int> count(X, 0);
            for (int i = r; i < (int)nums.size(); i += k) {
                ++count[nums[i]];
                ++size;
            }
            // Rewriting a whole class costs its full size and leaves its
            // value free, so every state is reachable at best; keeping a
            // value that already occurs can only improve on that.
            int best = INF;
            for (int x = 0; x < X; ++x) {
                best = min(best, dp[x]);
            }
            best += size;
            vector<int> nxt(X, best);
            for (int v = 0; v < X; ++v) {
                int c = count[v];
                if (c == 0) {
                    continue;
                }
                int cost = size - c;
                for (int u = 0; u < X; ++u) {
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
};
