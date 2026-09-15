class Solution {

    public int maxScore(int n, int k, int[][] stayScore, int[][] travelScore) {
        // dp[j] is the best score after the processed days with the tourist
        // in city j; every city starts at 0, which encodes the free choice
        // of the starting city. Each day, city j is either stayed in
        // (dp[j] + stayScore[i][j]) or reached by a move c -> j
        // (dp[c] + travelScore[c][j]). The c == j term is a 0-point no-op
        // (travelScore[i][i] == 0); keeping it inside the max is harmless,
        // since replacing a no-op day with a stay never lowers the score.
        int[] dp = new int[n];
        for (int i = 0; i < k; ++i) {
            int[] reached = new int[n];
            for (int j = 0; j < n; ++j) {
                int best = dp[j] + stayScore[i][j];
                for (int c = 0; c < n; ++c) {
                    best = Math.max(best, dp[c] + travelScore[c][j]);
                }
                reached[j] = best;
            }
            dp = reached;
        }
        int answer = dp[0];
        for (int j = 1; j < n; ++j) {
            answer = Math.max(answer, dp[j]);
        }
        return answer;
    }
}
