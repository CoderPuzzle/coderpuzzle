class Solution {

    public int possibleStringCount(String word, int k) {
        final long MOD = 1_000_000_007L;
        // Each maximal run of length c contributes between 1 and c intended
        // characters; count tuples of total length >= k as total - (length < k).
        int n = word.length();
        long[] runsL = new long[n];
        int r = 0;
        int i = 0;
        while (i < n) {
            int j = i;
            while (j < n && word.charAt(j) == word.charAt(i)) {
                j++;
            }
            runsL[r++] = j - i;
            i = j;
        }
        int[] runs = new int[r];
        for (int x = 0; x < r; x++) {
            runs[x] = (int) runsL[x];
        }

        long total = 1;
        for (int c : runs) {
            total = (total * c) % MOD;
        }
        if (k <= r) {
            return (int) total; // every tuple already has length >= r >= k
        }

        // dp[j] = number of ways to reach total length j (< k).
        long[] dp = new long[k];
        long[] ndp = new long[k];
        long[] prefix = new long[k + 1];
        dp[0] = 1;
        for (int c : runs) {
            long s = 0;
            for (int j = 0; j < k; j++) {
                s = (s + dp[j]) % MOD;
                prefix[j + 1] = s;
            }
            for (int j = 1; j < k; j++) {
                int lo = Math.max(0, j - c);
                ndp[j] = (prefix[j] - prefix[lo] + MOD) % MOD;
            }
            ndp[0] = 0;
            long[] tmp = dp;
            dp = ndp;
            ndp = tmp;
        }

        long bad = 0;
        for (int j = 0; j < k; j++) {
            bad = (bad + dp[j]) % MOD;
        }
        return (int) ((((total - bad) % MOD) + MOD) % MOD);
    }
}
