class Solution {
  public:
    long long maximumStrength(vector<int> &nums, int k) {
        const long long NEG = numeric_limits<long long>::min() / 4;
        int n = nums.size();
        // nxt[j][x] = dp[i+1][j][x]
        vector<array<long long, 2>> nxt(k + 1, {NEG, NEG});
        nxt[0][0] = 0;
        for (int i = n - 1; i >= 0; i--) {
            vector<array<long long, 2>> cur(k + 1, {NEG, NEG});
            for (int j = 0; j <= k; j++) {
                if (j >= 1) {
                    long long coeff = ((j & 1) != 0) ? j : -j;
                    long long best = nxt[j - 1][0];
                    if (nxt[j][1] > best) {
                        best = nxt[j][1];
                    }
                    cur[j][1] = nums[i] * coeff + best;
                }
                cur[j][0] = nxt[j][0];
                if (cur[j][1] > cur[j][0]) {
                    cur[j][0] = cur[j][1];
                }
            }
            nxt = cur;
        }
        return nxt[k][0];
    }
};
