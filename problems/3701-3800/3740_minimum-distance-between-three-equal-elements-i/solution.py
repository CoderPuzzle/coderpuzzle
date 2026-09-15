from typing import List


class Solution:
    def minimumDistance(self, nums: List[int]) -> int:
        # Sorted as a < b < c, a good tuple's distance collapses to
        # (b - a) + (c - b) + (c - a) = 2 * (c - a): only the outermost
        # indices matter, so the tightest triple of a value spans three
        # consecutive occurrences of it.
        best = -1
        # Last two indices seen for each value; any older occurrence can
        # only widen the span, so it never matters again.
        recent = {}
        for i, num in enumerate(nums):
            last = recent.setdefault(num, [])
            if len(last) == 2:
                distance = 2 * (i - last[0])
                if best == -1 or distance < best:
                    best = distance
                last[0] = last[1]
                last[1] = i
            else:
                last.append(i)
        return best
