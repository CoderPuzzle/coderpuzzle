class Solution {

    public int longestPalindrome(String s, String t) {
        int n = s.length(),
            m = t.length();
        // palS[i][j] (palT[i][j]) records whether s[i..j] (t[i..j]) is a
        // palindrome; the tables also give single-string answers, since
        // either substring may be empty. Padding rows keep the below-row in
        // bounds.
        boolean[][] palS = new boolean[n + 1][n + 1];
        int best = 0;
        for (int i = n - 1; i >= 0; --i) {
            palS[i][i] = true;
            for (int j = i + 1; j < n; ++j) {
                palS[i][j] = s.charAt(i) == s.charAt(j) && (j == i + 1 || palS[i + 1][j - 1]);
            }
            for (int j = n - 1; j >= i; --j) {
                if (palS[i][j]) {
                    best = Math.max(best, j - i + 1);
                    break;
                }
            }
        }
        boolean[][] palT = new boolean[m + 1][m + 1];
        for (int i = m - 1; i >= 0; --i) {
            palT[i][i] = true;
            for (int j = i + 1; j < m; ++j) {
                palT[i][j] = t.charAt(i) == t.charAt(j) && (j == i + 1 || palT[i + 1][j - 1]);
            }
            for (int j = m - 1; j >= i; --j) {
                if (palT[i][j]) {
                    best = Math.max(best, j - i + 1);
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
                        boolean ok = true;
                        for (int k = 0; k < limit; ++k) {
                            if (s.charAt(i + k) != t.charAt(j2 - k)) {
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
}
