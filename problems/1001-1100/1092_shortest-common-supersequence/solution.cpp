class Solution {
  public:
    string shortestCommonSupersequence(string str1, string str2) {
        int n = str1.size();
        int m = str2.size();
        // dp[i][j] = length of the LCS of str1[i:] and str2[j:].
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                if (str1[i] == str2[j]) {
                    dp[i][j] = dp[i + 1][j + 1] + 1;
                } else {
                    dp[i][j] = max(dp[i + 1][j], dp[i][j + 1]);
                }
            }
        }

        string result;
        result.reserve(n + m);
        int i = 0;
        int j = 0;
        while (i < n && j < m) {
            if (str1[i] == str2[j]) {
                result.push_back(str1[i]);
                i += 1;
                j += 1;
            } else if (dp[i + 1][j] >= dp[i][j + 1]) {
                result.push_back(str1[i]);
                i += 1;
            } else {
                result.push_back(str2[j]);
                j += 1;
            }
        }
        result.append(str1, i, n - i);
        result.append(str2, j, m - j);
        return result;
    }
};
