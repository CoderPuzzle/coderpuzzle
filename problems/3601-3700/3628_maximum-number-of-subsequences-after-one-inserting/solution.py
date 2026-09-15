from typing import List


class Solution:
    def numOfSubsequences(self, s: str) -> int:
        # Forward pass fills preL[i] / preLC[i] (L's and LC pairs strictly
        # before boundary i) and accumulates base, the LCT count of s. The
        # backward pass fills sufT[i] / sufCT[i] (T's and CT pairs at or
        # after boundary i). Inserting letter x at boundary i gains
        # sufCT[i] for L, preL[i] * sufT[i] for C, and preLC[i] for T, so
        # the answer is base plus the best gain over the n + 1 boundaries.
        # Totals peak near ((n+1)/3)^3 ≈ 3.8e13 < 2^53, exact in a long /
        # i64 / Number.
        n = len(s)
        preL = [0] * (n + 1)
        preLC = [0] * (n + 1)
        base = 0
        cntL = 0
        cntLC = 0
        for i, ch in enumerate(s):
            preL[i] = cntL
            preLC[i] = cntLC
            if ch == "L":
                cntL += 1
            elif ch == "C":
                cntLC += cntL
            elif ch == "T":
                base += cntLC
        preL[n] = cntL
        preLC[n] = cntLC
        sufT = [0] * (n + 1)
        sufCT = [0] * (n + 1)
        cntT = 0
        cntCT = 0
        for i in range(n - 1, -1, -1):
            sufT[i + 1] = cntT
            sufCT[i + 1] = cntCT
            if s[i] == "T":
                cntT += 1
            elif s[i] == "C":
                cntCT += cntT
        sufT[0] = cntT
        sufCT[0] = cntCT
        gain = 0
        for i in range(n + 1):
            if sufCT[i] > gain:
                gain = sufCT[i]
            if preL[i] * sufT[i] > gain:
                gain = preL[i] * sufT[i]
            if preLC[i] > gain:
                gain = preLC[i]
        return base + gain
