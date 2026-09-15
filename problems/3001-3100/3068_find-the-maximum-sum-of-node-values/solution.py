from typing import List, Optional


class Solution:
    def maximumValueSum(self, nums: List[int], k: int, edges: List[List[int]]) -> int:
        # Each operation XORs two endpoints, and tree connectivity lets any
        # even-sized subset of nodes be flipped, so only the parity of the
        # pick matters. delta = gain from flipping one node.
        deltas = [(x ^ k) - x for x in nums]
        # Greedy: take every positive delta while the count stays even.
        positives = [d for d in deltas if d > 0]
        base = sum(nums) + sum(positives)
        if len(positives) % 2 == 0:
            return base
        # Odd flip count is illegal: either drop the smallest positive delta
        # or add the largest non-positive one, whichever costs less.
        best = None
        if positives:
            best = min(positives)
        non_positives = [d for d in deltas if d <= 0]
        if non_positives:
            penalty = -max(non_positives)
            if best is None or penalty < best:
                best = penalty
        return base - best
