class Solution {
  public:
    long long numOfSubsequences(string s) {
        // Forward pass fills preL[i] / preLC[i] (L's and LC pairs strictly
        // before boundary i) and accumulates base, the LCT count of s. The
        // backward pass fills sufT[i] / sufCT[i] (T's and CT pairs at or
        // after boundary i). Inserting letter x at boundary i gains
        // sufCT[i] for L, preL[i] * sufT[i] for C, and preLC[i] for T, so
        // the answer is base plus the best gain over the n + 1 boundaries.
        // Totals peak near ((n+1)/3)^3 ≈ 3.8e13, so long long is required.
        int n = s.size();
        vector<long long> preL(n + 1, 0), preLC(n + 1, 0);
        long long base = 0, cntL = 0, cntLC = 0;
        for (int i = 0; i < n; ++i) {
            preL[i] = cntL;
            preLC[i] = cntLC;
            char ch = s[i];
            if (ch == 'L') {
                ++cntL;
            } else if (ch == 'C') {
                cntLC += cntL;
            } else if (ch == 'T') {
                base += cntLC;
            }
        }
        preL[n] = cntL;
        preLC[n] = cntLC;
        vector<long long> sufT(n + 1, 0), sufCT(n + 1, 0);
        long long cntT = 0, cntCT = 0;
        for (int i = n - 1; i >= 0; --i) {
            sufT[i + 1] = cntT;
            sufCT[i + 1] = cntCT;
            char ch = s[i];
            if (ch == 'T') {
                ++cntT;
            } else if (ch == 'C') {
                cntCT += cntT;
            }
        }
        sufT[0] = cntT;
        sufCT[0] = cntCT;
        long long gain = 0;
        for (int i = 0; i <= n; ++i) {
            gain = max(gain, sufCT[i]);
            gain = max(gain, preL[i] * sufT[i]);
            gain = max(gain, preLC[i]);
        }
        return base + gain;
    }
};
