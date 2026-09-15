class Solution {
  public:
    int numberWays(vector<vector<int>> &hats) {
        const long long MOD = 1000000007;
        int n = hats.size();
        int full = (1 << n) - 1;
        vector<vector<int>> h2p(41);
        for (int p = 0; p < n; p++) {
            for (int h : hats[p]) {
                h2p[h].push_back(p);
            }
        }
        // dp[mask]: ways to hat exactly the people in mask using hats so far
        // (<=10 people -> 1024 states; hats fold into the loop dimension)
        vector<long long> dp(full + 1, 0);
        dp[0] = 1;
        for (int h = 1; h <= 40; h++) {
            const vector<int> &people = h2p[h];
            if (people.empty()) {
                continue;
            }
            // copy encodes leaving this hat unused; updating into the copy
            // (reading old dp) also ensures no hat is worn by two people
            vector<long long> ndp = dp;
            for (int mask = 0; mask <= full; mask++) {
                long long v = dp[mask];
                if (v == 0) {
                    continue;
                }
                for (int p : people) {
                    int bit = 1 << p;
                    if ((mask & bit) == 0) {
                        int nm = mask | bit;
                        ndp[nm] = (ndp[nm] + v) % MOD;
                    }
                }
            }
            dp = move(ndp);
        }
        // full mask: every person hatted; unused hats cost nothing
        return (int)dp[full];
    }
};
