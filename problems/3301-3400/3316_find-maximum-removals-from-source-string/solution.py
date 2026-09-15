from typing import List


class Solution:
    def maxRemovals(self, source: str, pattern: str, targetIndices: List[int]) -> int:
        # Walk source once keeping, for every prefix length k of pattern,
        # the most removals achievable with k characters already matched.
        # Every position carries each state over unchanged (the character
        # can always be kept unused), adds one when the position is a
        # removable target that gets deleted, and moves state k to k + 1
        # when the character equals pattern[k]. Unreachable states sit at
        # NEG, whose drift stays far below zero across the whole scan.
        NEG = -(1 << 30)
        m = len(pattern)
        removable = [False] * len(source)
        for idx in targetIndices:
            removable[idx] = True
        prev = [NEG] * (m + 1)
        prev[0] = 0
        for i, c in enumerate(source):
            cur = [NEG] * (m + 1)
            cut = prev
            if removable[i]:
                cut = [x + 1 for x in prev]
            for k in range(m + 1):
                best = cut[k]
                if k and c == pattern[k - 1] and prev[k - 1] > best:
                    best = prev[k - 1]
                cur[k] = best
            prev = cur
        return prev[m]
