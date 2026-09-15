from typing import List


class Solution:
    def findLUSlength(self, strs: List[str]) -> int:
        # A string can only win as itself: if any other string contains it as
        # a subsequence, every subsequence it could offer is common to both,
        # and equal duplicates contain each other, so both are disqualified.
        best = -1
        for i, s in enumerate(strs):
            contained = False
            for j, t in enumerate(strs):
                if i == j:
                    continue
                # Two-pointer scan: walk t once, advancing in s whenever the
                # next character matches; s is a subsequence of t iff all
                # of s was consumed.
                at = 0
                for c in t:
                    if at < len(s) and s[at] == c:
                        at += 1
                if at == len(s):
                    contained = True
                    break
            if not contained:
                best = max(best, len(s))
        return best
