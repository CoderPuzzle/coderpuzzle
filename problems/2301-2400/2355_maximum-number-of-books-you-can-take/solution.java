class Solution {

    public long maximumBooks(int[] books) {
        int n = books.length;
        // dp[i] = best total of a strictly increasing chain ending at i;
        // the rightmost shelf gives everything, so each take is books[i]-(i-x).
        long[] dp = new long[n];
        // Monotonic stack of barrier candidates (nearest j where the chain dies).
        int[] stack = new int[n];
        int top = -1;
        long best = 0;
        for (int i = 0; i < n; i++) {
            long bi = books[i];
            // Pop shelves x that still fit the demand books[i] - (i - x):
            // any future chain stopping past them stops at or before i.
            while (top >= 0 && books[stack[top]] >= bi - (i - stack[top])) {
                top--;
            }
            // Remaining top is the nearest barrier j; the chain covers j+1..i.
            int j = top >= 0 ? stack[top] : -1;
            long length;
            if (j >= 0) {
                length = i - j;
            } else {
                // No barrier: the chain runs to shelf 0, but a shelf cannot
                // demand fewer than one book, so it caps at min(i, books[i])+1.
                length = Math.min(i, bi) + 1; // stop where the sequence would go negative
            }
            // Arithmetic sum of the run, spliced with dp[j]: shelf j tops out
            // strictly below the demanded value, so the two chains join validly.
            long s = length * bi - (length * (length - 1)) / 2;
            dp[i] = s + (j >= 0 ? dp[j] : 0);
            if (dp[i] > best) {
                best = dp[i];
            }
            stack[++top] = i;
        }
        return best;
    }
}
