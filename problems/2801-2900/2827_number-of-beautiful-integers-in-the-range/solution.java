import java.util.Arrays;

class Solution {

    public int numberOfBeautifulIntegers(int low, int high, int k) {
        return (int) (countUpTo(high, k) - countUpTo(low - 1, k));
    }

    // countUpTo(n) = beautiful integers in [1, n]; the answer is the
    // difference of the two bounds. f(0) returns 0, so low = 1 contributes
    // nothing on the low side.
    private long countUpTo(long n, int k) {
        if (n <= 0) return 0;
        char[] chars = Long.toString(n).toCharArray();
        int len = chars.length;
        int[] digits = new int[len];
        for (int i = 0; i < len; i++) digits[i] = chars[i] - '0';
        // memo[pos][tight][started][balance+10][mod]
        long[][][][][] memo = new long[len + 1][2][2][21][k];
        for (long[][][][] a : memo) {
            for (long[][][] b : a) {
                for (long[][] c : b) {
                    for (long[] d : c) Arrays.fill(d, -1);
                }
            }
        }
        return dp(0, 1, 0, 0, 0, digits, k, memo);
    }

    private long dp(int pos, int tight, int started, int balance, int mod, int[] digits, int k, long[][][][][] memo) {
        // Digit DP tracking everything the two conditions need: balance
        // (odd digits minus even digits written so far) and value mod k.
        // Memoization shares all loose subproblems, so the recursion
        // enumerates states, not numbers.
        int len = digits.length;
        if (pos == len) {
            return started == 1 && balance == 0 && mod == 0 ? 1 : 0;
        }
        long cached = memo[pos][tight][started][balance + 10][mod];
        if (cached >= 0) return cached;
        // tight: prefix still equals the bound's, capping this digit.
        int limit = tight == 1 ? digits[pos] : 9;
        long total = 0;
        for (int d = 0; d <= limit; d++) {
            int nextTight = tight == 1 && d == limit ? 1 : 0;
            // A leading zero writes nothing: it leaves the balance
            // untouched and does not count as an even digit.
            if (started == 0 && d == 0) {
                total += dp(pos + 1, nextTight, 0, balance, (mod * 10 + d) % k, digits, k, memo);
            } else {
                int newBalance = balance + (d % 2 == 1 ? 1 : -1);
                total += dp(pos + 1, nextTight, 1, newBalance, (mod * 10 + d) % k, digits, k, memo);
            }
        }
        memo[pos][tight][started][balance + 10][mod] = total;
        return total;
    }
}
