class Solution {

    public int knightDialer(int n) {
        // counts[d] is the number of distinct numbers of the current length
        // that end on digit d. Every cell seeds one number of length 1, and
        // each pass pushes every count through the knight's hop list — a
        // number ending on d extends by one hop to each knight-neighbor of
        // d — so n - 1 passes grow the row to length n and the row sum is
        // the answer. Cell 5 has no knight-neighbor, so it seeds length 1
        // and never extends again.
        final int MOD = 1_000_000_007;
        final int[][] hops = {
            { 4, 6 },
            { 6, 8 },
            { 7, 9 },
            { 4, 8 },
            { 0, 3, 9 },
            {},
            { 0, 1, 7 },
            { 2, 6 },
            { 1, 3 },
            { 2, 4 },
        };
        long[] counts = { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 };
        for (int step = 1; step < n; ++step) {
            long[] next = new long[10];
            for (int d = 0; d < 10; ++d) {
                for (int e : hops[d]) {
                    next[e] = (next[e] + counts[d]) % MOD;
                }
            }
            counts = next;
        }
        long total = 0;
        for (long c : counts) {
            total = (total + c) % MOD;
        }
        return (int) total;
    }
}
