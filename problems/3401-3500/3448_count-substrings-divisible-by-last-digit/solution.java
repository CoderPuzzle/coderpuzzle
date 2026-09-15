class Solution {

    public long countSubstrings(String s) {
        int n = s.length();
        int[] digits = new int[n];
        for (int i = 0; i < n; i++) digits[i] = s.charAt(i) - '0';
        long total = 0;
        // One independent pass per candidate last digit d; the passes sum.
        // cnt[r] counts suffixes of the already-processed prefix whose value
        // is congruent to r modulo d.
        for (int d = 1; d < 10; d++) {
            long[] cnt = new long[d];
            for (int di : digits) {
                // Extending a suffix of remainder r by this digit d yields
                // r*10 + d, divisible exactly when (r * 10) % d == 0; the +1
                // covers the single-character substring "d".
                if (di == d) {
                    for (int r = 0; r < d; r++) {
                        if ((r * 10) % d == 0) {
                            total += cnt[r];
                        }
                    }
                    total += 1;
                }
                // Remap every suffix: appending di sends remainder r to
                // (10*r + di) % d, and di alone starts a fresh suffix.
                long[] newCnt = new long[d];
                for (int r = 0; r < d; r++) {
                    if (cnt[r] != 0) {
                        newCnt[(r * 10 + di) % d] += cnt[r];
                    }
                }
                newCnt[di % d] += 1;
                cnt = newCnt;
            }
        }
        return total;
    }
}
