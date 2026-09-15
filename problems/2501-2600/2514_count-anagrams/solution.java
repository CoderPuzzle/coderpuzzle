class Solution {

    private static final long MOD = 1_000_000_007L;

    public int countAnagrams(String s) {
        // Product over words of the multinomial len!/prod(count!), all
        // reduced modulo 1e9+7; division becomes multiplication by the
        // Fermat inverse x^(p-2).
        long answer = 1;
        int start = 0;
        for (int i = 0; i <= s.length(); i++) {
            if (i == s.length() || s.charAt(i) == ' ') {
                answer = (answer * wordWays(s, start, i)) % MOD;
                start = i + 1;
            }
        }
        return (int) answer;
    }

    private long wordWays(String s, int from, int to) {
        int[] counts = new int[26];
        for (int i = from; i < to; i++) {
            counts[s.charAt(i) - 'a']++;
        }
        long term = factorialMod(to - from);
        for (int count : counts) {
            if (count > 1) {
                term = (term * modPow(factorialMod(count), MOD - 2)) % MOD;
            }
        }
        return term;
    }

    private long factorialMod(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result = (result * i) % MOD;
        }
        return result;
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
