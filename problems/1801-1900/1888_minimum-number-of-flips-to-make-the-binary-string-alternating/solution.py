from typing import List, Optional


class Solution:
    def minFlips(self, s: str) -> int:
        n = len(s)
        t = s + s
        # pre[i] = mismatches of t[0:i] against the absolute pattern 0,1,0,1,...
        pre = [0] * (len(t) + 1)
        for i, ch in enumerate(t):
            want = "01"[i & 1]
            pre[i + 1] = pre[i] + (ch != want)
        best = n
        for k in range(n):
            abs_mismatch = pre[k + n] - pre[k]
            if k & 1:
                cost_a = n - abs_mismatch
            else:
                cost_a = abs_mismatch
            best = min(best, cost_a, n - cost_a)
        return best
