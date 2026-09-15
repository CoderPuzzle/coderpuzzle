from typing import List


class Solution:
    def canThreePartsEqualSum(self, arr: List[int]) -> bool:
        # If the total isn't a multiple of 3, no equal three-way split can
        # exist. Otherwise each part must sum to target = total // 3.
        total = sum(arr)
        if total % 3 != 0:
            return False
        target = total // 3
        # Scan for two target-sum boundaries, stopping before the last
        # index so at least one element is always left for the third part.
        # Once total == 3 * target, whatever remains after two hits is
        # guaranteed to sum to target too, so it never needs scanning.
        count = 0
        running = 0
        for value in arr[:-1]:
            running += value
            if running == target:
                count += 1
                running = 0
                if count == 2:
                    return True
        return False
