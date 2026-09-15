from collections import Counter
from typing import List


class Solution:
    def maximumWidth(self, planks: List[int]) -> int:
        # For a fixed fence height h: every height-h plank joins the fence
        # as is, and planks of any other height can only contribute as
        # halves of disjoint pairs summing to h. A height-h plank itself can
        # never be in such a pair (its partner would need height 0), so
        # singles and pairs never compete for a plank: their counts add.
        freq = Counter(planks)
        heights = sorted(freq)
        # bucket[s] = number of disjoint pairs of planks whose heights sum
        # to s, accumulated once over every unordered pair of height values.
        bucket = {}
        for i, x in enumerate(heights):
            count_x = freq[x]
            if count_x >= 2:
                bucket[2 * x] = bucket.get(2 * x, 0) + count_x // 2
            for y in heights[i + 1 :]:
                count_y = freq[y]
                pairs = count_x if count_x < count_y else count_y
                bucket[x + y] = bucket.get(x + y, 0) + pairs
        # Achievable fence heights are exactly the original heights plus the
        # pairwise sums; a lone plank already builds a width-1 fence.
        best = max(freq.values())
        for s, pairs in bucket.items():
            total = pairs + freq.get(s, 0)
            if total > best:
                best = total
        return best
