import java.util.*;

class Solution {

    public String shortestCommonSupersequence(String str1, String str2) {
        int n = str1.length();
        int m = str2.length();
        // dp[i][j] = length of the LCS of str1[i:] and str2[j:].
        int[][] dp = new int[n + 1][m + 1];
        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                if (str1.charAt(i) == str2.charAt(j)) {
                    dp[i][j] = dp[i + 1][j + 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
                }
            }
        }

        StringBuilder sb = new StringBuilder();
        int i = 0;
        int j = 0;
        while (i < n && j < m) {
            if (str1.charAt(i) == str2.charAt(j)) {
                sb.append(str1.charAt(i));
                i += 1;
                j += 1;
            } else if (dp[i + 1][j] >= dp[i][j + 1]) {
                sb.append(str1.charAt(i));
                i += 1;
            } else {
                sb.append(str2.charAt(j));
                j += 1;
            }
        }
        sb.append(str1, i, n);
        sb.append(str2, j, m);
        return sb.toString();
    }
}
