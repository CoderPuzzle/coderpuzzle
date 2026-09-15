from typing import List


class Solution:
    def diStringMatch(self, s: str) -> List[int]:
        # Two counters bracket the value range: `lo` is the smallest value
        # not yet placed, `hi` the largest. An 'I' is safest satisfied with
        # lo (everything still unused is larger), a 'D' with hi — the pinned
        # canonical construction.
        n = len(s)
        lo, hi = 0, n
        perm = []
        for c in s:
            if c == "I":
                perm.append(lo)
                lo += 1
            else:
                perm.append(hi)
                hi -= 1
        # lo and hi have met; the single leftover value fills the last slot.
        perm.append(lo)
        return perm
