class Solution {
  public:
    string stoneGameIII(vector<int> &stoneValue) {
        int n = stoneValue.size();
        // dp[i] = best (current player's score - opponent's score) on the
        // suffix starting at i; dp[n] = 0 is the empty-row base.
        vector<long long> dp(n + 1, 0);
        // Backwards fill so dp[j+1] is already known whenever dp[i] reads it.
        for (int i = n - 1; i >= 0; i--) {
            long long take = 0;
            long long best = LLONG_MIN;
            // Try taking 1-3 piles; the clamp handles short rows. Taking
            // piles i..j earns `take`, then the opponent plays optimally and
            // wins dp[j+1] over us, so the net is take - dp[j+1].
            int hi = min(i + 3, n);
            for (int j = i; j < hi; j++) {
                take += stoneValue[j];
                long long cand = take - dp[j + 1];
                best = max(best, cand);
            }
            dp[i] = best;
        }
        // Alice moves first: dp[0] is her optimal margin over Bob.
        if (dp[0] > 0) {
            return "Alice";
        }
        if (dp[0] < 0) {
            return "Bob";
        }
        return "Tie";
    }
};
