#include <algorithm>
#include <cstdlib>
#include <string>
#include <vector>

class Solution {
  public:
    // Suffix DP over run states plus a greedy walk. A[i][c] is the cheapest
    // completion of the remaining positions given a closed run (length >= 3)
    // of character c; a fresh run planted at i consumes i, i+1, i+2 and
    // re-enters the closed state at i+3, so switching away from c costs the
    // best "triple(i, ch) + A[i+3][ch]" over ch != c — kept as a top-2 pair
    // so excluding c itself stays O(1). The walk takes the smallest
    // character whose branch keeps the remaining budget achievable.
    string minCostGoodCaption(string caption) {
        int n = (int)caption.size();
        if (n < 3) {
            return "";
        }
        const int INF = 1 << 30;
        vector<int> src(n);
        for (int i = 0; i < n; ++i)
            src[i] = caption[i] - 'a';
        vector<int> A(26 * (n + 4), INF);
        for (int c = 0; c < 26; ++c)
            A[26 * n + c] = 0;
        vector<int> m1(n, INF), m2(n, INF), j1(n, -1), j2(n, -1);
        for (int i = n - 1; i >= 0; --i) {
            int si = src[i];
            int rowNext = 26 * (i + 1);
            int best1 = INF, best2 = INF, idx1 = -1, idx2 = -1;
            if (i + 3 <= n) {
                int s1 = src[i + 1];
                int s2 = src[i + 2];
                int rowTriple = 26 * (i + 3);
                for (int ch = 0; ch < 26; ++ch) {
                    int v = abs(si - ch) + abs(s1 - ch) + abs(s2 - ch) + A[rowTriple + ch];
                    if (v < best1) {
                        best2 = best1, idx2 = idx1, best1 = v, idx1 = ch;
                    } else if (v < best2) {
                        best2 = v, idx2 = ch;
                    }
                }
                m1[i] = best1, j1[i] = idx1, m2[i] = best2, j2[i] = idx2;
            }
            int row = 26 * i;
            for (int c = 0; c < 26; ++c) {
                int extend = abs(si - c) + A[rowNext + c];
                int switchAway = idx1 < 0 ? INF : (idx1 != c ? best1 : best2);
                A[row + c] = min(extend, switchAway);
            }
        }
        int budget = m1[0];
        string out;
        out.reserve(n);
        int r = 0, c = -1; // trailing run length; 0 only before the first char
        for (int i = 0; i < n; ++i) {
            int si = src[i];
            int chosen;
            int cand;
            if (r == 1) {
                // a length-1 run must still reach length 3: needs i, i+1
                cand = i + 2 <= n ? abs(si - c) + abs(src[i + 1] - c) + A[26 * (i + 2) + c] : INF;
                chosen = c;
            } else if (r == 2) {
                cand = abs(si - c) + A[26 * (i + 1) + c];
                chosen = c;
            } else {
                // free choice: extend the closed run, or plant a fresh one
                int ext = r == 3 ? abs(si - c) + A[26 * (i + 1) + c] : INF;
                int pick = 27, pickVal = INF;
                if (m1[i] == budget && j1[i] != c) {
                    pick = j1[i], pickVal = m1[i];
                } else if (m2[i] == budget && j2[i] != c) {
                    pick = j2[i], pickVal = m2[i];
                }
                if (ext == budget && c < pick) {
                    pick = c, pickVal = ext;
                }
                chosen = pick;
                cand = pickVal;
            }
            // unreachable: every reachable state keeps a branch on budget
            if (cand != budget) {
                return "";
            }
            out.push_back((char)('a' + chosen));
            budget -= abs(si - chosen);
            if (r == 0 || (r == 3 && chosen != c)) {
                r = 1;
                c = chosen;
            } else if (r < 3) {
                ++r;
            }
        }
        return out;
    }
};
