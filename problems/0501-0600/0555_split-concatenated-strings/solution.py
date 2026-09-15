from typing import List


class Solution:
    def splitLoopedString(self, strs: List[str]) -> str:
        # Every string except the breakpoint carrier stands at max(s, s
        # reversed) - fixed slot lengths make per-string maxima optimal. The
        # breakpoint string itself is tried in BOTH orientations at every
        # cut, its suffix leading the regular string and its prefix closing
        # it, wrapped around the others' standing forms in loop order.
        best = [max(s, s[::-1]) for s in strs]
        n = len(strs)
        ans = ""
        for i, s in enumerate(strs):
            others = "".join(best[(i + 1 + j) % n] for j in range(n - 1))
            for t in (s, s[::-1]):
                for k in range(len(t)):
                    cand = t[k:] + others + t[:k]
                    if cand > ans:
                        ans = cand
        return ans
