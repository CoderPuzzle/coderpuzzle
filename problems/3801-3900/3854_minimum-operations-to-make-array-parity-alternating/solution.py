from typing import List, Optional


class Solution:
    def makeParityAlternating(self, nums: List[int]) -> List[int]:
        # An alternating array follows one of two templates (even-first or
        # odd-first), and every element fits exactly one of them at its
        # index — so one pass scores both. The template an element matches
        # pins its value; the other pays one operation and may settle at
        # v - 1 or v + 1, whose window the slack bounds v+1 / v-1 enclose.
        ops = [0, 0]
        lo = [float("inf"), float("inf")]
        hi = [float("-inf"), float("-inf")]
        for i, v in enumerate(nums):
            matched = 0 if (v & 1) == (i & 1) else 1
            missed = 1 - matched
            ops[missed] += 1
            lo[missed] = min(lo[missed], v + 1)
            hi[missed] = max(hi[missed], v - 1)
            lo[matched] = min(lo[matched], v)
            hi[matched] = max(hi[matched], v)
        best = None
        for t in (0, 1):
            spread = hi[t] - lo[t]
            if ops[t] > 0 and spread < 1:
                # Paying operations means n >= 2 and the final array
                # alternates, so its spread is at least 1; the slack bounds
                # alone can collapse to 0 (nums = [10, 10]).
                spread = 1
            if best is None or (ops[t], spread) < best:
                best = (ops[t], spread)
        return [best[0], best[1]]
