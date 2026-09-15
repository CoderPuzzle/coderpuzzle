import java.util.Arrays;

class Solution {

    public String minCostGoodCaption(String caption) {
        // Suffix DP over run states plus a greedy walk. A[i][c] is the
        // cheapest completion of the remaining positions given a closed run
        // (length >= 3) of character c; a fresh run planted at i consumes
        // i, i+1, i+2 and re-enters the closed state at i+3, so switching
        // away from c costs the best "triple(i, ch) + A[i+3][ch]" over
        // ch != c — kept as a top-2 pair so excluding c stays O(1). The
        // walk takes the smallest character whose branch keeps the
        // remaining budget achievable.
        int n = caption.length();
        if (n < 3) {
            return "";
        }
        final int INF = 1 << 30;
        int[] src = new int[n];
        for (int i = 0; i < n; ++i) src[i] = caption.charAt(i) - 'a';
        int[] A = new int[26 * (n + 4)];
        Arrays.fill(A, INF);
        for (int c = 0; c < 26; ++c) A[26 * n + c] = 0;
        int[] m1 = new int[n],
            m2 = new int[n],
            j1 = new int[n],
            j2 = new int[n];
        for (int i = n - 1; i >= 0; --i) {
            int si = src[i];
            int rowNext = 26 * (i + 1);
            int best1 = INF,
                best2 = INF,
                idx1 = -1,
                idx2 = -1;
            if (i + 3 <= n) {
                int s1 = src[i + 1];
                int s2 = src[i + 2];
                int rowTriple = 26 * (i + 3);
                for (int ch = 0; ch < 26; ++ch) {
                    int v = Math.abs(si - ch) + Math.abs(s1 - ch) + Math.abs(s2 - ch) + A[rowTriple + ch];
                    if (v < best1) {
                        best2 = best1;
                        idx2 = idx1;
                        best1 = v;
                        idx1 = ch;
                    } else if (v < best2) {
                        best2 = v;
                        idx2 = ch;
                    }
                }
            }
            m1[i] = best1;
            j1[i] = idx1;
            m2[i] = best2;
            j2[i] = idx2;
            int row = 26 * i;
            for (int c = 0; c < 26; ++c) {
                int extend = Math.abs(si - c) + A[rowNext + c];
                int switchAway = idx1 < 0 ? INF : idx1 != c ? best1 : best2;
                A[row + c] = Math.min(extend, switchAway);
            }
        }
        int budget = m1[0];
        StringBuilder out = new StringBuilder(n);
        int r = 0,
            c = -1; // trailing run length; 0 only before the first char
        for (int i = 0; i < n; ++i) {
            int si = src[i];
            int chosen;
            int cand;
            if (r == 1) {
                // a length-1 run must still reach length 3: needs i, i+1
                cand = i + 2 <= n ? Math.abs(si - c) + Math.abs(src[i + 1] - c) + A[26 * (i + 2) + c] : INF;
                chosen = c;
            } else if (r == 2) {
                cand = Math.abs(si - c) + A[26 * (i + 1) + c];
                chosen = c;
            } else {
                // free choice: extend the closed run, or plant a fresh one
                int ext = r == 3 ? Math.abs(si - c) + A[26 * (i + 1) + c] : INF;
                int pick = 27,
                    pickVal = INF;
                if (m1[i] == budget && j1[i] != c) {
                    pick = j1[i];
                    pickVal = m1[i];
                } else if (m2[i] == budget && j2[i] != c) {
                    pick = j2[i];
                    pickVal = m2[i];
                }
                if (ext == budget && c < pick) {
                    pick = c;
                    pickVal = ext;
                }
                chosen = pick;
                cand = pickVal;
            }
            // unreachable: every reachable state keeps a branch on budget
            if (cand != budget) {
                return "";
            }
            out.append((char) ('a' + chosen));
            budget -= Math.abs(si - chosen);
            if (r == 0 || (r == 3 && chosen != c)) {
                r = 1;
                c = chosen;
            } else if (r < 3) {
                ++r;
            }
        }
        return out.toString();
    }
}
