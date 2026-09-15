from typing import List


class Solution:
    def countRectangles(self, rectangles: List[List[int]], points: List[List[int]]) -> List[int]:
        by_height = [[] for _ in range(101)]
        for l, h in rectangles:
            by_height[h].append(l)
        for heights in by_height:
            heights.sort()

        def count_at_least(lengths, x):
            lo, hi = 0, len(lengths)
            while lo < hi:
                mid = (lo + hi) // 2
                if lengths[mid] >= x:
                    hi = mid
                else:
                    lo = mid + 1
            return len(lengths) - lo

        count = []
        for x, y in points:
            total = 0
            for h in range(y, 101):
                total += count_at_least(by_height[h], x)
            count.append(total)
        return count
