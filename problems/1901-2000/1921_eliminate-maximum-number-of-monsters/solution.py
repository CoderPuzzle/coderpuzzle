from typing import List


class Solution:
    def eliminateMaximum(self, dist: List[int], speed: List[int]) -> int:
        # Monster i reaches the city at minute ceil(dist[i]/speed[i]) — at
        # that exact minute it already counts as a loss. The i-th shot
        # happens at minute i, so after sorting arrival minutes the answer
        # is the first position where the arrival is not strictly later
        # than the shot.
        arrivals = sorted((d + s - 1) // s for d, s in zip(dist, speed))
        for i, a in enumerate(arrivals):
            if a <= i:
                return i
        return len(arrivals)
