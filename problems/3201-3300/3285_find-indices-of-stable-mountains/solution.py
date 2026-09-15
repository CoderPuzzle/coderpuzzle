from typing import List


class Solution:
    def stableMountains(self, height: List[int], threshold: int) -> List[int]:
        # Mountain i is stable exactly when its immediate predecessor is
        # strictly taller than the threshold; one left-to-right pass emits
        # the qualifying indices in ascending order.
        stable = []
        for i in range(1, len(height)):
            if height[i - 1] > threshold:
                stable.append(i)
        return stable
