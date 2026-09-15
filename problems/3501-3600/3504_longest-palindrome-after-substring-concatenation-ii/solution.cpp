class Solution {
  public:
    int longestPalindrome(string s, string t) {
        int n = s.size(), m = t.size();
        // p[i] = longest palindrome starting at s[i]; a rolling interval
        // table fills every row bottom-up in O(n^2) time and O(n) space.
        vector<int> p(n, 1);
        vector<bool> below(n + 1, false);
        for (int i = n - 1; i >= 0; --i) {
            vector<bool> row(n + 1, false);
            row[i] = true;
            int best = 1;
            for (int j = i + 1; j < n; ++j) {
                row[j] = s[i] == s[j] && (j == i + 1 || below[j - 1]);
                if (row[j]) {
                    best = j - i + 1;
                }
            }
            p[i] = best;
            below = row;
        }
        // q[j] = longest palindrome ending at t[j]; the same fill records
        // the longest length per right end.
        vector<int> q(m, 1);
        below = vector<bool>(m + 1, false);
        for (int i = m - 1; i >= 0; --i) {
            vector<bool> row(m + 1, false);
            row[i] = true;
            for (int j = i + 1; j < m; ++j) {
                row[j] = t[i] == t[j] && (j == i + 1 || below[j - 1]);
                if (row[j]) {
                    q[j] = j - i + 1;
                }
            }
            below = row;
        }
        int best = 0;
        for (int v : p) {
            if (v > best)
                best = v;
        }
        for (int v : q) {
            if (v > best)
                best = v;
        }
        // dp[i][j] = longest palindrome starting with s[i] and ending with
        // t[j]. Each cell needs only dp[i+1][j-1], its neighbour on the
        // diagonal i + j, so one scalar walks each diagonal inward. At the
        // table edge the missing neighbour becomes p[i+1] (no t-part left) or
        // q[j-1] (no s-part left).
        for (int d = 0; d < n + m - 1; ++d) {
            int iHi = d < n ? d : n - 1;
            int iLo = d - m + 1 > 0 ? d - m + 1 : 0;
            int jHi = d - iHi;
            int nxt = 0;
            if (iHi < n - 1) {
                nxt = p[iHi + 1];
            } else if (jHi > 0) {
                nxt = q[jHi - 1];
            }
            for (int i = iHi; i >= iLo; --i) {
                int j = d - i;
                int cur = p[i] > q[j] ? p[i] : q[j];
                if (s[i] == t[j]) {
                    int add = nxt + 2;
                    if (add > cur) {
                        cur = add;
                    }
                }
                if (cur > best) {
                    best = cur;
                }
                nxt = cur;
            }
        }
        return best;
    }
};
