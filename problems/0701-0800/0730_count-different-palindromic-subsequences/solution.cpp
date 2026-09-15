class Solution {
  public:
    int countPalindromicSubsequences(string s) {
        // dp[x][i][j] counts the distinct palindromic subsequences of
        // s[i..j] that begin and end with chr(97 + x). An end that does
        // not match x shrinks off: dp[x][i+1][j] when s[i] != x, else
        // dp[x][i][j-1]. When both ends are x, gluing x onto both sides
        // of every palindromic interior gives 2 + sum_y dp[y][i+1][j-1]
        // — the +2 is "x" and "xx" — while adjacent ends carry only
        // those two. Every read stays in rows i and i+1, so two rolling
        // rows carry the table; the answer is sum_x dp[x][0][n-1].
        constexpr long long MOD = 1'000'000'007;
        int n = s.size();
        vector<array<long long, 4>> prev(n), cur(n);
        for (int i = n - 1; i >= 0; --i) {
            int c = s[i] - 'a';
            cur[i] = {};
            cur[i][c] = 1;
            for (int j = i + 1; j < n; ++j) {
                cur[j] = prev[j];
                if (s[j] - 'a' == c) {
                    if (j == i + 1) {
                        cur[j][c] = 2;
                    } else {
                        long long inner = prev[j - 1][0] + prev[j - 1][1] + prev[j - 1][2] + prev[j - 1][3];
                        cur[j][c] = (2 + inner) % MOD;
                    }
                } else {
                    cur[j][c] = cur[j - 1][c];
                }
            }
            swap(prev, cur);
        }
        long long total = prev[n - 1][0] + prev[n - 1][1] + prev[n - 1][2] + prev[n - 1][3];
        return total % MOD;
    }
};
