class Solution {

    public long mostPoints(int[][] questions) {
        int n = questions.length;
        // dp[i] = best score starting at question i; dp[n] = 0 is the
        // sentinel for "nothing left". Fill right to left so every future
        // value is ready before it is read.
        long[] dp = new long[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            long points = questions[i][0];
            int brainpower = questions[i][1];
            // nxt is the first question unlocked after the lockout; a jump
            // past the end reads the zero sentinel.
            int nxt = i + brainpower + 1;
            long take = points + (nxt <= n ? dp[nxt] : 0);
            // Skip keeps dp[i+1]; take solves and jumps.
            dp[i] = Math.max(dp[i + 1], take);
        }
        return dp[0];
    }
}
