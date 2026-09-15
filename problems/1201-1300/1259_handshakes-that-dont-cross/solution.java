class Solution {

    public int numberOfWays(int numPeople) {
        final long MOD = 1000000007L;
        int m = numPeople / 2;
        // catalan[i] = non-crossing handshake layouts for i pairs; an empty
        // circle has exactly one layout, anchoring the recurrence.
        long[] catalan = new long[m + 1];
        catalan[0] = 1;
        for (int i = 1; i <= m; i++) {
            long total = 0;
            // Fix person 1 and sum over their partner: the chord splits the
            // circle into two arcs filled independently (anything crossing
            // between arcs would cross the pivot chord). Partner j leaves
            // j pairs on one side and i-1-j on the other — the Catalan
            // recurrence catalan[i] = Σ catalan[j]·catalan[i-1-j].
            for (int j = 0; j < i; j++) {
                total = (total + catalan[j] * catalan[i - 1 - j]) % MOD;
            }
            catalan[i] = total;
        }
        return (int) catalan[m];
    }
}
