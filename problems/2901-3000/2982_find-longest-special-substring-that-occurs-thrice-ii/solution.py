from typing import List, Optional


class Solution:
    def maximumLength(self, s: str) -> int:
        # At 5*10^5 characters only run-length structure matters: group
        # each character's run lengths, keep the top three, and take the
        # best of the three ways to place three windows.
        runs = [[] for _ in range(26)]
        i, n = 0, len(s)
        while i < n:
            j = i
            while j < n and s[j] == s[i]:
                j += 1
            runs[ord(s[i]) - 97].append(j - i)
            i = j
        best = -1
        for rs in runs:
            if not rs:
                continue
            rs.sort(reverse=True)
            f1 = rs[0]
            f2 = rs[1] if len(rs) > 1 else 0
            f3 = rs[2] if len(rs) > 2 else 0
            # three windows in one run / two + one / one in each;
            # a 0 candidate means this character never reaches three.
            cand = max(f1 - 2, min(f1 - 1, f2), f3)
            if cand >= 1 and cand > best:
                best = cand
        return best
