from typing import List, Optional


class Solution:
    def minimumRefill(self, plants: List[int], capacityA: int, capacityB: int) -> int:
        left = 0
        right = len(plants) - 1
        remaining_a = capacityA
        remaining_b = capacityB
        refills = 0

        while left < right:
            if remaining_a < plants[left]:
                remaining_a = capacityA
                refills += 1
            remaining_a -= plants[left]

            if remaining_b < plants[right]:
                remaining_b = capacityB
                refills += 1
            remaining_b -= plants[right]
            left += 1
            right -= 1

        if left == right and max(remaining_a, remaining_b) < plants[left]:
            refills += 1
        return refills
