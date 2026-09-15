from typing import List


class Solution:
    def mergeTriplets(self, triplets: List[List[int]], target: List[int]) -> bool:
        # Drop overshooters; the survivors' componentwise max is the
        # best-reachable triplet.
        best = [0, 0, 0]
        for a, b, c in triplets:
            if a <= target[0] and b <= target[1] and c <= target[2]:
                best = [max(best[0], a), max(best[1], b), max(best[2], c)]
        return best == list(target)
