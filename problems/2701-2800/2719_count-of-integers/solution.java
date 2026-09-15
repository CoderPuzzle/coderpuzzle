class Solution {

    public int count(String num1, String num2, int min_sum, int max_sum) {
        final long MOD = 1000000007L;
        long a = countRange(num2, min_sum, max_sum);
        long b = countRange(decrement(num1), min_sum, max_sum);
        return (int) ((((a - b) % MOD) + MOD) % MOD);
    }

    private long countRange(String s, int minSum, int maxSum) {
        final long MOD = 1000000007L;
        int m = s.length();
        int ms = maxSum;
        long[][] dp = new long[2][ms + 1];
        for (int sm = 0; sm <= ms; sm++) {
            long v = sm >= minSum ? 1 : 0;
            dp[0][sm] = v;
            dp[1][sm] = v;
        }
        for (int pos = m - 1; pos >= 0; pos--) {
            int d0 = s.charAt(pos) - '0';
            long[][] ndp = new long[2][ms + 1];
            for (int tight = 0; tight < 2; tight++) {
                int limit = tight == 1 ? d0 : 9;
                for (int sm = 0; sm <= ms; sm++) {
                    long total = 0;
                    for (int d = 0; d <= limit; d++) {
                        int ns = sm + d;
                        if (ns > ms) break;
                        int nt = tight == 1 && d == limit ? 1 : 0;
                        total += dp[nt][ns];
                    }
                    ndp[tight][sm] = total % MOD;
                }
            }
            dp = ndp;
        }
        return dp[1][0];
    }

    private String decrement(String s) {
        char[] arr = s.toCharArray();
        int i = arr.length - 1;
        while (i >= 0 && arr[i] == '0') {
            arr[i] = '9';
            i--;
        }
        arr[i] -= 1;
        int j = 0;
        while (j < arr.length - 1 && arr[j] == '0') j++;
        return new String(arr, j, arr.length - j);
    }
}
