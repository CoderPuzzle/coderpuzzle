import java.util.Arrays;

class Solution {

    public int countBalancedPermutations(String num) {
        // A balanced permutation is decided by how many copies of each
        // digit land on even indices: a_d of the cnt[d] copies, with
        // sum(a_d) = ceil(n/2) and sum(d * a_d) = total / 2 (the
        // odd-index sum is then implied by the total), each choice
        // contributing C(cnt[d], a_d). A bottom-up DP over digits with
        // states (even slots used, even-index sum) accumulates those
        // binomial products. Arranging the two chosen multisets over the
        // even and odd slots multiplies by even_count! * odd_count! /
        // cnt[d]!, folded in via one modular inverse at the end. All
        // arithmetic is modulo 1e9 + 7 in longs (products < 2^63),
        // iterative — no recursion.
        final long MOD = 1_000_000_007L;
        int n = num.length();
        int[] cnt = new int[10];
        for (int i = 0; i < n; i++) {
            cnt[num.charAt(i) - '0']++;
        }
        int total = 0;
        for (int d = 0; d < 10; d++) {
            total += d * cnt[d];
        }
        if (total % 2 != 0) {
            return 0;
        }
        int evenCount = (n + 1) / 2;
        int half = total / 2;
        long[][] binom = new long[n + 1][n + 1];
        for (int i = 0; i <= n; i++) {
            binom[i][0] = 1;
            for (int j = 1; j <= i; j++) {
                binom[i][j] = (binom[i - 1][j - 1] + binom[i - 1][j]) % MOD;
            }
        }
        long[][] dp = new long[evenCount + 1][half + 1];
        dp[0][0] = 1;
        for (int d = 0; d < 10; d++) {
            int c = cnt[d];
            if (c == 0) {
                continue;
            }
            long[][] ndp = new long[evenCount + 1][half + 1];
            for (int k = 0; k <= evenCount; k++) {
                for (int s = 0; s <= half; s++) {
                    long v = dp[k][s];
                    if (v == 0) {
                        continue;
                    }
                    for (int j = 0; j <= c && k + j <= evenCount && s + d * j <= half; j++) {
                        ndp[k + j][s + d * j] = (ndp[k + j][s + d * j] + v * binom[c][j]) % MOD;
                    }
                }
            }
            dp = ndp;
        }
        long[] fact = new long[n + 1];
        fact[0] = 1;
        for (int i = 1; i <= n; i++) {
            fact[i] = (fact[i - 1] * i) % MOD;
        }
        long slotWays = (fact[evenCount] * fact[n - evenCount]) % MOD;
        long denom = 1;
        for (int c : cnt) {
            denom = (denom * fact[c]) % MOD;
        }
        long inv = 1;
        long base = denom;
        long exp = MOD - 2;
        while (exp > 0) {
            if ((exp & 1) == 1) {
                inv = (inv * base) % MOD;
            }
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return (int) ((((dp[evenCount][half] * slotWays) % MOD) * inv) % MOD);
    }
}
