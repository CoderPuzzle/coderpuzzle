class Solution {

    public int numberOfCombinations(String num) {
        final int MOD = 1_000_000_007;
        final int n = num.length();
        if (n == 0 || num.charAt(0) == '0') {
            return 0;
        }

        // lcp[i][j] = length of the longest common prefix of num[i:] and num[j:]
        short[][] lcp = new short[n + 1][n + 1];
        for (int i = n - 1; i >= 0; i--) {
            short[] row = lcp[i];
            short[] nxt = lcp[i + 1];
            char ci = num.charAt(i);
            for (int j = n - 1; j >= 0; j--) {
                if (ci == num.charAt(j)) {
                    row[j] = (short) (nxt[j + 1] + 1);
                }
            }
        }

        // pre[i][j] = sum_{k=1..j} dp[i][k] (mod MOD), where dp[i][j] counts
        // separations of num[:i] whose last number is num[i-j:i].
        // dp is recovered from consecutive pre differences mod MOD.
        int[][] pre = new int[n + 1][n + 1];
        for (int i = 1; i <= n; i++) {
            int[] preI = pre[i];
            for (int j = 1; j <= i; j++) {
                int val;
                if (j == i) {
                    val = 1; // whole prefix num[:i] is a single number
                } else if (num.charAt(i - j) == '0') {
                    val = 0; // leading zero not allowed
                } else {
                    int m = i - j;
                    int lim = Math.min(j - 1, m);
                    val = pre[m][lim];
                    if (m >= j) {
                        int a = i - 2 * j;
                        int b = m;
                        int l = lcp[a][b];
                        if (l >= j || num.charAt(a + l) <= num.charAt(b + l)) {
                            int add = pre[m][j] - pre[m][j - 1];
                            if (add < 0) {
                                add += MOD;
                            }
                            val += add;
                            if (val >= MOD) {
                                val -= MOD;
                            }
                        }
                    }
                }
                preI[j] = preI[j - 1] + val;
                if (preI[j] >= MOD) {
                    preI[j] -= MOD;
                }
            }
        }
        return pre[n][n];
    }
}
