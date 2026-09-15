#include <string>
#include <vector>

class Solution {
  public:
    string minWindow(string s1, string s2) {
        int n = s1.size(), m = s2.size();
        // nxt[i][c] answers "where is the first character c at or after i?"
        // in one lookup. A backward sweep builds it: row i copies row i+1 and
        // overwrites the column of the character sitting at i; row n is all
        // sentinels, so every failed jump lands on n and ends the walk.
        vector<vector<int>> nxt(n + 1, vector<int>(26, n));
        for (int i = n - 1; i >= 0; --i) {
            nxt[i] = nxt[i + 1];
            nxt[i][s1[i] - 'a'] = i;
        }
        // A minimum window must open on s2[0] — otherwise its head could be
        // cut for a strictly shorter valid window — so walking from every such
        // opening and always jumping to the earliest continuation visits every
        // candidate. Scanning openings left to right and keeping only strictly
        // shorter windows leaves the leftmost one among equal-length winners.
        int bestLen = n + 1, bestStart = -1;
        for (int i = 0; i < n; ++i) {
            if (s1[i] != s2[0])
                continue;
            int pos = i;
            bool ok = true;
            for (int k = 1; k < m; ++k) {
                pos = nxt[pos + 1][s2[k] - 'a'];
                if (pos == n) {
                    ok = false;
                    break;
                }
            }
            if (ok && pos - i + 1 < bestLen) {
                bestLen = pos - i + 1;
                bestStart = i;
                if (bestLen == m)
                    break; // |s2| is the unavoidable lower bound
            }
        }
        return bestStart < 0 ? "" : s1.substr(bestStart, bestLen);
    }
};
