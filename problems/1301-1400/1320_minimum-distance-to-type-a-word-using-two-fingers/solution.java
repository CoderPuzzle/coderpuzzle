class Solution {

    public int minimumDistance(String word) {
        // dp[o] = cheapest cost of the typed prefix with the resting finger on
        // letter o (o == 26 models the still-unused finger, distance 0).
        int[] dp = new int[27];
        for (int i = 1; i < word.length(); ++i) {
            int prev = word.charAt(i - 1) - 'A';
            int cur = word.charAt(i) - 'A';
            int step = dist(prev, cur);
            int[] nxt = new int[27];
            java.util.Arrays.fill(nxt, Integer.MAX_VALUE);
            for (int o = 0; o < 27; ++o) {
                long cost = dp[o];
                if (cost == Integer.MAX_VALUE) continue;
                // Move the finger that just typed; the resting finger stays.
                if (cost + step < nxt[o]) nxt[o] = (int) (cost + step);
                // The resting finger types cur; prev becomes the new rest.
                long move = cost + dist(o, cur);
                if (move < nxt[prev]) nxt[prev] = (int) move;
            }
            dp = nxt;
        }
        int best = Integer.MAX_VALUE;
        for (int cost : dp) best = Math.min(best, cost);
        return best;
    }

    private int dist(int a, int b) {
        if (a == 26 || b == 26) return 0;
        return Math.abs(a / 6 - b / 6) + Math.abs((a % 6) - (b % 6));
    }
}
