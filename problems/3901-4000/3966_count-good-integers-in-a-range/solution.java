class Solution {

    public long goodIntegers(long l, long r, int k) {
        return countGood(r, k) - countGood(l - 1, k);
    }

    private long countGood(long x, int k) {
        if (x < 0) return 0;
        String s = Long.toString(x);
        int n = s.length();
        int[] digits = new int[n];
        for (int i = 0; i < n; i++) digits[i] = s.charAt(i) - '0';
        // memo[pos][tight][prev+1][started]; prev index 0 = unused
        long[][][][] memo = new long[n + 1][2][11][2];
        for (long[][][] a : memo) for (long[][] b : a) for (long[] c : b) java.util.Arrays.fill(c, -1);
        return dp(0, 1, 0, 0, digits, k, memo);
    }

    private long dp(int pos, int tight, int prev, int started, int[] digits, int k, long[][][][] memo) {
        if (pos == digits.length) return 1;
        long slot = memo[pos][tight][prev + 1][started];
        if (slot != -1) return slot;
        int limit = tight == 1 ? digits[pos] : 9;
        long total = 0;
        for (int d = 0; d <= limit; d++) {
            int ntight = tight == 1 && d == limit ? 1 : 0;
            if (started == 0 && d == 0) {
                total += dp(pos + 1, ntight, 0, 0, digits, k, memo);
            } else {
                if (started == 1 && Math.abs(d - prev) > k) continue;
                total += dp(pos + 1, ntight, d, 1, digits, k, memo);
            }
        }
        memo[pos][tight][prev + 1][started] = total;
        return total;
    }
}
