from typing import List


class Solution:
    def pourWater(self, heights: List[int], volume: int, k: int) -> List[int]:
        # One droplet at a time, on a surface whose levels are terrain plus
        # already-settled water. A droplet probes left first: walk as far as
        # the non-increasing levels allow; if the walk ends strictly below
        # the landing level at k, the droplet settles on the nearest cell of
        # that lowest stretch (walk back over the equal-level plateau). If
        # left cannot make it fall, probe right the same way. If neither
        # direction can, the droplet rises at k itself.
        n = len(heights)
        for _ in range(volume):
            pos = k
            while pos > 0 and heights[pos - 1] <= heights[pos]:
                pos -= 1
            if heights[pos] < heights[k]:
                while heights[pos + 1] == heights[pos]:
                    pos += 1
                heights[pos] += 1
                continue
            pos = k
            while pos < n - 1 and heights[pos + 1] <= heights[pos]:
                pos += 1
            if heights[pos] < heights[k]:
                while heights[pos - 1] == heights[pos]:
                    pos -= 1
                heights[pos] += 1
                continue
            heights[k] += 1
        return heights
