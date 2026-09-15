class Solution {

    public int countKReducibleNumbers(String s, int k) {
        final int MOD = 1000000007;
        int L = s.length();
        // f[x] = number of operations to reduce x to 1.
        int[] f = new int[L + 1];
        for (int x = 2; x <= L; x++) {
            int bits = Integer.bitCount(x);
            f[x] = 1 + f[bits];
        }
        // Pascal's triangle mod MOD.
        int[][] C = new int[L + 1][L + 1];
        for (int i = 0; i <= L; i++) {
            C[i][0] = 1;
            for (int j = 1; j <= i; j++) {
                C[i][j] = (int) ((C[i - 1][j - 1] + C[i - 1][j]) % MOD);
            }
        }
        // cnt[p] = number of integers x in [0, n-1] with popcount(x) == p.
        long[] cnt = new long[L + 1];
        int ones = 0;
        for (int i = 0; i < L; i++) {
            if (s.charAt(i) == '1') {
                int remaining = L - i - 1;
                for (int p = 0; p <= remaining; p++) {
                    cnt[ones + p] = (cnt[ones + p] + C[remaining][p]) % MOD;
                }
                ones++;
            }
        }
        long ans = 0;
        for (int p = 1; p <= L; p++) {
            if (1 + f[p] <= k) {
                ans = (ans + cnt[p]) % MOD;
            }
        }
        return (int) ans;
    }
}
