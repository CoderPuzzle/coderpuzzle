from typing import Dict, List, Tuple


class Solution:
    def removeBoxes(self, boxes: List[int]) -> int:
        # Memoized interval DP. dfs(l, r, k) is the best score from
        # boxes[l..r] when k boxes of boxes[l]'s color, already removed
        # from outside the interval, sit glued to its left and will join
        # its group.
        n = len(boxes)
        memo: Dict[Tuple[int, int, int], int] = {}

        def dfs(l: int, r: int, k: int) -> int:
            if l > r:
                return 0
            # Adjacent same-colored boxes never need separate treatment:
            # holding boxes[l] until its identical neighbor leaves only
            # grows the eventual group, so the run joins the carry.
            while l < r and boxes[l + 1] == boxes[l]:
                l += 1
                k += 1
            key = (l, r, k)
            if key in memo:
                return memo[key]
            # Either take boxes[l] and its carry now, scoring (k+1)^2...
            best = (k + 1) * (k + 1) + dfs(l + 1, r, 0)
            # ...or hold it: clear boxes[l+1..m-1] first, so boxes[l]
            # meets the next same-colored box one richer in the carry.
            for m in range(l + 1, r + 1):
                if boxes[m] == boxes[l]:
                    best = max(best, dfs(l + 1, m - 1, 0) + dfs(m, r, k + 1))
            memo[key] = best
            return best

        return dfs(0, n - 1, 0)
