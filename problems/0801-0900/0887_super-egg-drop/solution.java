class Solution {

    public int superEggDrop(int k, int n) {
        // dp[e]: floors resolvable with `moves` moves and e eggs; grow the
        // move count until k eggs cover all n floors.
        long[] dp = new long[k + 1];
        int moves = 0;
        while (dp[k] < n) {
            moves++;
            // One drop settles its own floor plus the below-case (e - 1 eggs)
            // and the above-case (e eggs), each with one move fewer. Sweeping
            // e downward keeps dp[e - 1] at the previous move's value — the
            // in-place 0/1 knapsack trick.
            for (int e = k; e >= 1; e--) {
                dp[e] = dp[e - 1] + dp[e] + 1;
            }
        }
        return moves;
    }
}
