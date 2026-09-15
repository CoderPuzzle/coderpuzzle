class Solution {
  public:
    int maxValue(vector<int> &nums, int k) {
        int n = (int)nums.size();
        const int V = 128; // nums[i] < 2^7, OR values stay below 128

        // pre[j] = ORs of exactly k elements from first j elements
        vector<array<bool, 128>> pre(n + 1);
        {
            vector<array<bool, 128>> dp(k + 1);
            dp[0][0] = true;
            for (int i = 0; i < n; i++) {
                int x = nums[i];
                int top = min(i + 1, k);
                for (int c = top; c >= 1; c--) {
                    auto &src = dp[c - 1];
                    auto &dst = dp[c];
                    for (int m = 0; m < V; m++) {
                        if (src[m]) {
                            dst[m | x] = true;
                        }
                    }
                }
                pre[i + 1] = dp[k];
            }
        }

        // suf[i] = ORs of exactly k elements from nums[i:]
        vector<array<bool, 128>> suf(n + 1);
        {
            vector<array<bool, 128>> dp(k + 1);
            dp[0][0] = true;
            for (int i = n - 1; i >= 0; i--) {
                int x = nums[i];
                int top = min(n - i, k);
                for (int c = top; c >= 1; c--) {
                    auto &src = dp[c - 1];
                    auto &dst = dp[c];
                    for (int m = 0; m < V; m++) {
                        if (src[m]) {
                            dst[m | x] = true;
                        }
                    }
                }
                suf[i] = dp[k];
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
                        ans = max(ans, a ^ b);
                    }
                }
            }
        }
        return ans;
    }
};
