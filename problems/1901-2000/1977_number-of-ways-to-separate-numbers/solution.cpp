class Solution {
  public:
    int numberOfCombinations(string num) {
        const int MOD = 1000000007;
        const int n = num.size();
        if (n == 0 || num[0] == '0') {
            return 0;
        }

        // lcp[i][j] = length of the longest common prefix of num[i:] and num[j:]
        vector<vector<unsigned short>> lcp(n + 1, vector<unsigned short>(n + 1, 0));
        for (int i = n - 1; i >= 0; --i) {
            vector<unsigned short> &row = lcp[i];
            const vector<unsigned short> &nxt = lcp[i + 1];
            char ci = num[i];
            for (int j = n - 1; j >= 0; --j) {
                if (ci == num[j]) {
                    row[j] = (unsigned short)(nxt[j + 1] + 1);
                }
            }
        }

        // pre[i][j] = sum_{k=1..j} dp[i][k] (mod MOD), where dp[i][j] counts
        // separations of num[:i] whose last number is num[i-j:i].
        // dp is recovered from consecutive pre differences mod MOD.
        vector<vector<int>> pre(n + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= n; ++i) {
            vector<int> &preI = pre[i];
            for (int j = 1; j <= i; ++j) {
                int val;
                if (j == i) {
                    val = 1; // whole prefix num[:i] is a single number
                } else if (num[i - j] == '0') {
                    val = 0; // leading zero not allowed
                } else {
                    int m = i - j;
                    int lim = min(j - 1, m);
                    val = pre[m][lim];
                    if (m >= j) {
                        int a = i - 2 * j;
                        int b = m;
                        int l = lcp[a][b];
                        if (l >= j || num[a + l] <= num[b + l]) {
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
};
