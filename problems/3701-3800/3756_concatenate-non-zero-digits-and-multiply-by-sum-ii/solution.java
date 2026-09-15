class Solution {

    public int[] sumAndMultiply(String s, int[][] queries) {
        // Prefix arrays over the NON-ZERO digits: prefVal keeps the value
        // mod M of concatenating them, prefSum their digit sum, prefCnt
        // their count. The compressed substring s[l..r] is the slice of the
        // non-zero sequence between indexes cnt[l] and cnt[r+1]; its value
        // is recoverable from the two prefix values with one pow10 shift,
        // and its digit sum is a plain prefix difference (zeros add 0 to
        // both). All products stay below (10^9+7)^2 ~ 1e18, inside long.
        final int MOD = 1_000_000_007;
        int n = s.length();
        long[] prefVal = new long[n + 1];
        long[] prefSum = new long[n + 1];
        int[] prefCnt = new int[n + 1];
        long[] pow10 = new long[n + 1];
        pow10[0] = 1;
        for (int i = 0; i < n; i++) {
            int d = s.charAt(i) - '0';
            prefVal[i + 1] = prefVal[i];
            prefSum[i + 1] = prefSum[i] + d;
            prefCnt[i + 1] = prefCnt[i];
            pow10[i + 1] = (pow10[i] * 10) % MOD;
            if (s.charAt(i) != '0') {
                prefVal[i + 1] = (prefVal[i] * 10 + d) % MOD;
                prefCnt[i + 1]++;
            }
        }
        int[] answer = new int[queries.length];
        for (int q = 0; q < queries.length; q++) {
            int k = prefCnt[queries[q][1] + 1] - prefCnt[queries[q][0]];
            // x = the concatenation of the k non-zero digits in s[l..r];
            // prefVal[r+1] = prefVal[l] * 10^k + x, so solve for x.
            long x = (prefVal[queries[q][1] + 1] - prefVal[queries[q][0]] * pow10[k]) % MOD;
            if (x < 0) {
                x += MOD;
            }
            long digitSum = prefSum[queries[q][1] + 1] - prefSum[queries[q][0]];
            answer[q] = (int) ((x * digitSum) % MOD);
        }
        return answer;
    }
}
