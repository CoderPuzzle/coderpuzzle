class Solution {
  public:
    long long numberOfStableArrays(int zero, int one, int limit) {
        // Bottom-up block DP: dp[z][o][d] counts stable arrays ending with
        // digit d; appending a block of the opposite digit sums the trailing
        // `limit` cells along one axis. Residues stay under 2^31 and window
        // totals under 1000 * MOD < 2^50, exact in long long arithmetic.
        const long long MOD = 1000000007LL;
        int w = one + 1;
        vector<long long> vert(w, 0), prevOnes(w, 0);
        vector<vector<long long>> history(zero);
        long long answer = 0;
        for (int z = 0; z <= zero; z++) {
            for (int o = 0; o < w; o++)
                vert[o] += prevOnes[o];
            int drop = z - 1 - limit;
            if (drop >= 0) {
                const vector<long long> &gone = history[drop];
                for (int o = 0; o < w; o++)
                    vert[o] -= gone[o];
            }
            vector<long long> curZeros(w, 0), curOnes(w, 0);
            curZeros[0] = z >= 1 && z <= limit ? 1 : 0;
            // Circular ring buffer over this row's zero cells, seeded with
            // the column-0 base cell so windows reach down to index 0.
            vector<long long> ring(limit, 0);
            int head = 1 % limit, tail = 0, count = 1;
            long long ringSum = curZeros[0];
            ring[0] = curZeros[0];
            for (int o = 1; o <= one; o++) {
                curZeros[o] = vert[o] % MOD;
                curOnes[o] = ringSum % MOD;
                if (count == limit) {
                    ringSum -= ring[tail];
                    if (++tail == limit)
                        tail = 0;
                    count--;
                }
                ring[head] = curZeros[o];
                if (++head == limit)
                    head = 0;
                count++;
                ringSum += curZeros[o];
            }
            if (z == 0) {
                // Row z == 0 holds the all-ones prefixes themselves.
                for (int o = 1; o <= one; o++)
                    curOnes[o] = o <= limit ? 1 : 0;
            }
            answer = (curZeros[one] + curOnes[one]) % MOD;
            if (z < zero)
                history[z] = curOnes;
            prevOnes = curOnes;
        }
        return answer;
    }
};
