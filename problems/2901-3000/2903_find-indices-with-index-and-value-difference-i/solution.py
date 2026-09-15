from typing import List


class Solution:
    def findIndices(self, nums: List[int], indexDifference: int, valueDifference: int) -> List[int]:
        # The first ordered pair (i, j) clearing both thresholds is a valid
        # answer by the statement's "return any of them"; the conditions are
        # symmetric in the two indices, so scan order only picks the witness.
        for i in range(len(nums)):
            for j in range(len(nums)):
                if abs(i - j) >= indexDifference and abs(nums[i] - nums[j]) >= valueDifference:
                    return [i, j]
        # Every ordered pair failed both checks, so no answer exists.
        return [-1, -1]
