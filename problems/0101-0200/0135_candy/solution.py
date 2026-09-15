from typing import List, Optional


class Solution:
    def candy(self, ratings: List[int]) -> int:
        n = len(ratings)
        # One candy per child is the minimum allowed.
        candies = [1] * n
        # Left-to-right: enforce the left-neighbor rule with the smallest value
        # exceeding the left neighbor's allotment.
        for i in range(1, n):
            if ratings[i] > ratings[i - 1]:
                candies[i] = candies[i - 1] + 1
        # Right-to-left: enforce the right-neighbor rule symmetrically. The
        # max only raises a count, never lowers it, so these fixes cannot undo
        # the first pass's left-neighbor guarantees.
        for i in range(n - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                candies[i] = max(candies[i], candies[i + 1] + 1)
        return sum(candies)
