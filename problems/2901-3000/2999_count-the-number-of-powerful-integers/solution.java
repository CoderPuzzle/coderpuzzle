class Solution {

    public long numberOfPowerfulInt(long start, long finish, int limit, String s) {
        return countPowerful(finish, limit, s) - countPowerful(start - 1, limit, s);
    }

    private long countPowerful(long x, int limit, String s) {
        if (x <= 0) return 0;
        int n = Long.toString(x).length();
        int lenS = s.length();
        if (lenS > n) return 0;
        long sv = Long.parseLong(s);
        if (x < sv) return 0;
        long pow = 1;
        for (int i = 0; i < lenS; i++) pow *= 10;
        long cap = (x - sv) / pow;
        long total = 1; // the number s itself (empty prefix)
        for (int p = 1; p <= n - lenS; p++) {
            total += countExactLen(p, cap, limit);
        }
        return total;
    }

    // number of integers with exactly p digits, every digit <= lim, <= cap
    private long countExactLen(int p, long cap, int lim) {
        long low = pow10(p - 1);
        if (cap < low) return 0;
        if (cap >= pow10(p) - 1) {
            long res = lim;
            for (int i = 0; i < p - 1; i++) res *= lim + 1;
            return res;
        }
        String str = Long.toString(cap);
        int[] capDigits = new int[p];
        for (int i = 0; i < p; i++) capDigits[i] = str.charAt(i) - '0';

        long[][] memo = new long[p + 1][2];
        for (long[] row : memo) {
            row[0] = -1;
            row[1] = -1;
        }
        return dp(0, 1, p, capDigits, lim, memo);
    }

    private long dp(int pos, int tight, int p, int[] capDigits, int lim, long[][] memo) {
        if (pos == p) return 1;
        if (memo[pos][tight] >= 0) return memo[pos][tight];
        int up = tight == 1 ? capDigits[pos] : 9;
        int lo = pos == 0 ? 1 : 0;
        long total = 0;
        int hi = Math.min(up, lim);
        for (int d = lo; d <= hi; d++) {
            total += dp(pos + 1, tight == 1 && d == up ? 1 : 0, p, capDigits, lim, memo);
        }
        memo[pos][tight] = total;
        return total;
    }

    private long pow10(int e) {
        long r = 1;
        for (int i = 0; i < e; i++) r *= 10;
        return r;
    }
}
