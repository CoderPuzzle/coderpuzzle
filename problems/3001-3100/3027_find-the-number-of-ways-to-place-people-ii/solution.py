from typing import List


class Solution:
    def numberOfPairs(self, points: List[List[int]]) -> int:
        # Sort by x ascending, breaking x-ties by y descending: every
        # candidate lower-right corner for an upper-left anchor then lives
        # at a later index, and so does every potential blocker of that
        # pair (earlier same-x points sit strictly above the anchor, later
        # same-x points strictly below any candidate).
        points.sort(key=lambda p: (p[0], -p[1]))
        total = 0
        for i, (_, top) in enumerate(points):
            # window is the tallest y-coordinate seen so far in this sweep
            # that does not exceed top. A candidate at height y is valid
            # exactly when no seen blocker reaches down to it.
            window = -(10**18)
            for _, y in points[i + 1 :]:
                if y > top:
                    continue
                if window < y:
                    total += 1
                window = max(window, y)
        return total
