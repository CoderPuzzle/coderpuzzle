import java.util.Arrays;

class Solution {

    public String minWindow(String s1, String s2) {
        int n = s1.length(),
            m = s2.length();
        // nxt[i][c] answers "where is the first character c at or after i?"
        // in one lookup. A backward sweep builds it: row i copies row i+1 and
        // overwrites the column of the character sitting at i; row n is all
        // sentinels, so every failed jump lands on n and ends the walk.
        int[][] nxt = new int[n + 1][];
        nxt[n] = new int[26];
        Arrays.fill(nxt[n], n);
        for (int i = n - 1; i >= 0; i--) {
            nxt[i] = nxt[i + 1].clone();
            nxt[i][s1.charAt(i) - 'a'] = i;
        }
        // A minimum window must open on s2[0] — otherwise its head could be
        // cut for a strictly shorter valid window — so walking from every such
        // opening and always jumping to the earliest continuation visits every
        // candidate. Scanning openings left to right and keeping only strictly
        // shorter windows leaves the leftmost one among equal-length winners.
        int bestLen = n + 1,
            bestStart = -1;
        char first = s2.charAt(0);
        for (int i = 0; i < n; i++) {
            if (s1.charAt(i) != first) continue;
            int pos = i;
            boolean ok = true;
            for (int k = 1; k < m; k++) {
                pos = nxt[pos + 1][s2.charAt(k) - 'a'];
                if (pos == n) {
                    ok = false;
                    break;
                }
            }
            if (ok && pos - i + 1 < bestLen) {
                bestLen = pos - i + 1;
                bestStart = i;
                if (bestLen == m) break; // |s2| is the unavoidable lower bound
            }
        }
        return bestStart < 0 ? "" : s1.substring(bestStart, bestStart + bestLen);
    }
}
