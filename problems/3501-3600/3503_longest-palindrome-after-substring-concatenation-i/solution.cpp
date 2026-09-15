class Solution {
  public:
    int longestPalindrome(string s, string t) {
        int n = s.size(), m = t.size();
        // palS[i][j] (palT[i][j]) records whether s[i..j] (t[i..j]) is a
        // palindrome; the tables also give single-string answers, since
        // either substring may be empty. Padding rows keep the below-row in
        // bounds.
        vector<vector<bool>> palS(n + 1, vector<bool>(n + 1, false));
        int best = 0;
        for (int i = n - 1; i >= 0; --i) {
            palS[i][i] = true;
            for (int j = i + 1; j < n; ++j) {
                palS[i][j] = s[i] == s[j] && (j == i + 1 || palS[i + 1][j - 1]);
            }
            for (int j = n - 1; j >= i; --j) {
                if (palS[i][j]) {
                    best = max(best, j - i + 1);
                    break;
                }
            }
        }
        vector<vector<bool>> palT(m + 1, vector<bool>(m + 1, false));
        for (int i = m - 1; i >= 0; --i) {
            palT[i][i] = true;
            for (int j = i + 1; j < m; ++j) {
                palT[i][j] = t[i] == t[j] && (j == i + 1 || palT[i + 1][j - 1]);
            }
            for (int j = m - 1; j >= i; --j) {
                if (palT[i][j]) {
                    best = max(best, j - i + 1);
                    break;
                }
            }
        }
        // Enumerate every pair of non-empty substrings. The concatenation
        // s[i..i2] + t[j..j2] is a palindrome iff the shorter side mirrors
        // the longer one and the leftover piece is itself a palindrome.
        for (int i = 0; i < n; ++i) {
            for (int i2 = i; i2 < n; ++i2) {
                int la = i2 - i + 1;
                for (int j = 0; j < m; ++j) {
                    for (int j2 = j; j2 < m; ++j2) {
                        int lb = j2 - j + 1;
                        if (la + lb <= best) {
                            continue;
                        }
                        int limit = la < lb ? la : lb;
                        bool ok = true;
                        for (int k = 0; k < limit; ++k) {
                            if (s[i + k] != t[j2 - k]) {
                                ok = false;
                                break;
                            }
                        }
                        if (!ok) {
                            continue;
                        }
                        if (la == lb) {
                            best = la + lb;
                        } else if (la > lb && palS[i + lb][i2]) {
                            best = la + lb;
                        } else if (la < lb && palT[j][j2 - la]) {
                            best = la + lb;
                        }
                    }
                }
            }
        }
        return best;
    }
};
