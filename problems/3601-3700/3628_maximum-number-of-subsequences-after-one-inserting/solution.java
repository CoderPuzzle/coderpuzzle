class Solution {

    public long numOfSubsequences(String s) {
        // Forward pass fills preL[i] / preLC[i] (L's and LC pairs strictly
        // before boundary i) and accumulates base, the LCT count of s. The
        // backward pass fills sufT[i] / sufCT[i] (T's and CT pairs at or
        // after boundary i). Inserting letter x at boundary i gains
        // sufCT[i] for L, preL[i] * sufT[i] for C, and preLC[i] for T, so
        // the answer is base plus the best gain over the n + 1 boundaries.
        // Totals peak near ((n+1)/3)^3 ≈ 3.8e13, so long math is required.
        int n = s.length();
        long[] preL = new long[n + 1];
        long[] preLC = new long[n + 1];
        long base = 0;
        long cntL = 0;
        long cntLC = 0;
        for (int i = 0; i < n; ++i) {
            preL[i] = cntL;
            preLC[i] = cntLC;
            char ch = s.charAt(i);
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
        long[] sufT = new long[n + 1];
        long[] sufCT = new long[n + 1];
        long cntT = 0;
        long cntCT = 0;
        for (int i = n - 1; i >= 0; --i) {
            sufT[i + 1] = cntT;
            sufCT[i + 1] = cntCT;
            char ch = s.charAt(i);
            if (ch == 'T') {
                ++cntT;
            } else if (ch == 'C') {
                cntCT += cntT;
            }
        }
        sufT[0] = cntT;
        sufCT[0] = cntCT;
        long gain = 0;
        for (int i = 0; i <= n; ++i) {
            gain = Math.max(gain, sufCT[i]);
            gain = Math.max(gain, preL[i] * sufT[i]);
            gain = Math.max(gain, preLC[i]);
        }
        return base + gain;
    }
}
