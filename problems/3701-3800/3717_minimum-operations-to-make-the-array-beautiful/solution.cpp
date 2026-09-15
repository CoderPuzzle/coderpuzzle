class Solution {
  public:
    int minOperations(vector<int> &nums) {
        // Only increments exist and index 0 never moves, so a finished array
        // is a nondecreasing divisibility chain anchored at nums[0]. No
        // optimal chain runs above 2600: past max(nums) the chain could be
        // held flat for free (equal still divides), so only the last element
        // may sit higher, and its cheapest fix stays under predecessor + 50.
        const int cap = 2600;
        // Divisor lists of every final value, self inclusive -- holding the
        // previous height must remain a legal move.
        vector<vector<int>> divisors(cap + 1);
        for (int u = 1; u <= cap; u++) {
            for (int m = u; m <= cap; m += u) {
                divisors[m].push_back(u);
            }
        }
        const int inf = INT_MAX;
        // dp[v]: cheapest way to make the processed prefix beautiful with the
        // last position holding exactly v.
        vector<int> dp(cap + 1, inf);
        dp[nums[0]] = 0;
        for (int i = 1; i < (int)nums.size(); i++) {
            int need = nums[i];
            vector<int> ndp(cap + 1, inf);
            for (int v = need; v <= cap; v++) {
                int best = inf;
                for (int u : divisors[v]) {
                    if (dp[u] < best) {
                        best = dp[u];
                    }
                }
                if (best != inf) {
                    ndp[v] = best + v - need;
                }
            }
            dp = move(ndp);
        }
        int best = inf;
        for (int v : dp) {
            best = min(best, v);
        }
        return best;
    }
};
