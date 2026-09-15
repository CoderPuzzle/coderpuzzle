import java.util.ArrayList;
import java.util.List;

class Solution {

    private static final long MOD = 1_000_000_007L;

    public int countGoodSubsequences(String s) {
        // A good subsequence is generated exactly once by its shared
        // frequency m: each letter either sits out or contributes C(count,
        // m) index choices, so every per-m product counts one term of the
        // answer - plus the all-absent pick that surfaces in every
        // product and is dropped once per term. Factorial tables modulo
        // 1e9+7, division via Fermat inverses.
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
        }
        List<Integer> present = new ArrayList<>();
        int top = 0;
        for (int c : counts) {
            if (c > top) top = c;
            if (c > 0) present.add(c);
        }
        long[] fact = new long[top + 1];
        for (int i = 0; i <= top; i++) fact[i] = 1;
        for (int i = 2; i <= top; i++) {
            fact[i] = (fact[i - 1] * i) % MOD;
        }
        long[] invFact = new long[top + 1];
        invFact[top] = modPow(fact[top], MOD - 2);
        for (int i = top; i > 0; i--) {
            invFact[i - 1] = (invFact[i] * i) % MOD;
        }
        long total = 0;
        for (int m = 1; m <= top; m++) {
            long prod = 1;
            for (int count : present) {
                prod = (prod * (comb(count, m, fact, invFact) + 1)) % MOD;
            }
            total += prod - 1;
        }
        return (int) (total % MOD);
    }

    private long comb(int n, int k, long[] fact, long[] invFact) {
        if (k > n) {
            return 0;
        }
        return (((fact[n] * invFact[k]) % MOD) * invFact[n - k]) % MOD;
    }

    private long modPow(long base, long exp) {
        long result = 1;
        base %= MOD;
        while (exp > 0) {
            if ((exp & 1) == 1) result = (result * base) % MOD;
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return result;
    }
}
