from typing import List


class Solution:
    def tallestBillboard(self, rods: List[int]) -> int:
        # DP over the support-height difference. best[d] is the tallest left
        # support reachable with left - right == d; unreachable differences
        # hold -1. Each rod is welded left, welded right, or discarded.
        total = sum(rods)
        best = [-1] * (2 * total + 1)
        best[total] = 0  # index d + total keeps every difference non-negative
        for rod in rods:
            nxt = [-1] * (2 * total + 1)
            for idx, left in enumerate(best):
                if left < 0:
                    continue
                if left > nxt[idx]:
                    nxt[idx] = left  # discard the rod
                if left + rod > nxt[idx + rod]:
                    nxt[idx + rod] = left + rod  # weld onto the left support
                if left > nxt[idx - rod]:
                    nxt[idx - rod] = left  # weld onto the right support
            best = nxt
        # difference 0 means equal supports; its left height is the answer.
        return best[total]
