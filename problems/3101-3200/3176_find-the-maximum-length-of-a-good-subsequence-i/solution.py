from typing import List


class Solution:
    def maximumLength(self, nums: List[int], k: int) -> int:
        # A subsequence is good when at most k of its adjacent pairs
        # differ. Track one row per change budget: row[v][a] is the
        # longest good subsequence seen so far that uses exactly a
        # changes and ends on value v, and ends_all[a] mirrors the best
        # over all ending values so a "different value" extension is one
        # lookup. Each element either joins a same-valued tail without
        # spending budget or appends after any element while spending
        # one; both reads use stats frozen before this element.
        ends = {}
        ends_all = [0] * (k + 1)
        for x in nums:
            row = ends.setdefault(x, [0] * (k + 1))
            snap = ends_all[:]
            for a in range(k + 1):
                val = max(row[a], (snap[a - 1] if a else 0)) + 1
                if val > row[a]:
                    row[a] = val
                if val > ends_all[a]:
                    ends_all[a] = val
        return max(ends_all)
