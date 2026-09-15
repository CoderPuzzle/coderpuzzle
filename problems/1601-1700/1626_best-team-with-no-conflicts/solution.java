import java.util.Arrays;

class Solution {

    public int bestTeamScore(int[] scores, int[] ages) {
        int n = scores.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        // Sort player indices by age, breaking ties by score, so any
        // conflict-free team becomes a non-decreasing run of scores.
        Arrays.sort(order, (a, b) -> ages[a] != ages[b] ? ages[a] - ages[b] : scores[a] - scores[b]);

        int[] sortedScores = new int[n];
        for (int i = 0; i < n; i++) {
            sortedScores[i] = scores[order[i]];
        }

        // dp[i] = best total for a team ending at player i (in sorted order).
        int[] dp = new int[n];
        int best = 0;
        for (int i = 0; i < n; i++) {
            dp[i] = sortedScores[i];
            for (int j = 0; j < i; j++) {
                if (sortedScores[j] <= sortedScores[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + sortedScores[i]);
                }
            }
            best = Math.max(best, dp[i]);
        }
        return best;
    }
}
