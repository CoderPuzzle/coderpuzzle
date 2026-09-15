class Solution {

    public String stoneGameIII(int[] stoneValue) {
        int n = stoneValue.length;
        // dp[i] = best (current player's score - opponent's score) on the
        // suffix starting at i; dp[n] = 0 is the empty-row base.
        long[] dp = new long[n + 1];
        // Backwards fill so dp[j+1] is already known whenever dp[i] reads it.
        for (int i = n - 1; i >= 0; i--) {
            long take = 0;
            long best = Long.MIN_VALUE;
            // Try taking 1-3 piles; the clamp handles short rows. Taking
            // piles i..j earns `take`, then the opponent plays optimally and
            // wins dp[j+1] over us, so the net is take - dp[j+1].
            for (int j = i; j < Math.min(i + 3, n); j++) {
                take += stoneValue[j];
                long cand = take - dp[j + 1];
                if (cand > best) {
                    best = cand;
                }
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
}
