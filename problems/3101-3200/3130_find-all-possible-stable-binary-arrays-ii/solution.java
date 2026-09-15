class Solution {

    public long numberOfStableArrays(int zero, int one, int limit) {
        // Bottom-up block DP: dp[z][o][d] counts stable arrays ending with
        // digit d; appending a block of the opposite digit sums the trailing
        // `limit` cells along one axis. Residues stay under 2^31 and window
        // totals under 1000 * MOD < 2^50, exact in long arithmetic.
        final int MOD = 1000000007;
        int w = one + 1;
        long[] vert = new long[w];
        long[] prevOnes = new long[w];
        long[][] history = new long[zero][];
        long answer = 0;
        for (int z = 0; z <= zero; z++) {
            for (int o = 0; o < w; o++) {
                vert[o] += prevOnes[o];
            }
            int drop = z - 1 - limit;
            if (drop >= 0) {
                long[] gone = history[drop];
                for (int o = 0; o < w; o++) {
                    vert[o] -= gone[o];
                }
            }
            long[] curZeros = new long[w];
            curZeros[0] = z >= 1 && z <= limit ? 1 : 0;
            long[] curOnes = new long[w];
            // Circular ring buffer over this row's zero cells, seeded with
            // the column-0 base cell so windows reach down to index 0.
            long[] ring = new long[limit];
            int head = 1 % limit,
                tail = 0,
                count = 1;
            long ringSum = curZeros[0];
            ring[0] = curZeros[0];
            for (int o = 1; o <= one; o++) {
                curZeros[o] = vert[o] % MOD;
                curOnes[o] = ringSum % MOD;
                if (count == limit) {
                    ringSum -= ring[tail];
                    if (++tail == limit) tail = 0;
                    count--;
                }
                ring[head] = curZeros[o];
                if (++head == limit) head = 0;
                count++;
                ringSum += curZeros[o];
            }
            if (z == 0) {
                // Row z == 0 holds the all-ones prefixes themselves.
                for (int o = 1; o <= one; o++) {
                    curOnes[o] = o <= limit ? 1 : 0;
                }
            }
            answer = (curZeros[one] + curOnes[one]) % MOD;
            if (z < zero) history[z] = curOnes;
            prevOnes = curOnes;
        }
        return answer;
    }
}
