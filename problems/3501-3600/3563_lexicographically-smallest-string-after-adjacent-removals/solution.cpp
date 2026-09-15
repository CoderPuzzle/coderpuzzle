class Solution {
    static bool consec(char a, char b) {
        int d = abs((int)a - (int)b);
        return d == 1 || d == 25; // 'a'-'z' are consecutive (circular)
    }

  public:
    string lexicographicallySmallestString(string s) {
        int n = s.size();
        if (n <= 1)
            return s;

        // rem[i][j] = can s[i..j] be removed entirely
        vector<vector<char>> rem(n, vector<char>(n, 0));
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length <= n; i++) {
                int j = i + length - 1;
                for (int k = i; k < j; k++) {
                    if (rem[i][k] && rem[k + 1][j]) {
                        rem[i][j] = 1;
                        break;
                    }
                }
                if (!rem[i][j] && consec(s[i], s[j])) {
                    if (length == 2 || rem[i + 1][j - 1]) {
                        rem[i][j] = 1;
                    }
                }
            }
        }

        vector<string> ans(n + 1);
        ans[n] = "";
        for (int i = n - 1; i >= 0; i--) {
            string best;
            bool have = false;
            for (int j = i; j <= n; j++) {
                if (j > i && !rem[i][j - 1])
                    continue;
                string cand = j < n ? (string(1, s[j]) + ans[j + 1]) : "";
                if (!have || cand < best) {
                    best = cand;
                    have = true;
                }
            }
            ans[i] = best;
        }
        return ans[0];
    }
};
