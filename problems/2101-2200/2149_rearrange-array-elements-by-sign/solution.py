from typing import List, Optional


class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        # Each sign keeps its original relative order, so the k-th
        # positive belongs at slot 2k and the k-th negative at 2k + 1 —
        # one scatter pass places every element directly.
        result = [0] * len(nums)
        positives = negatives = 0
        for value in nums:
            if value > 0:
                result[2 * positives] = value
                positives += 1
            else:
                result[2 * negatives + 1] = value
                negatives += 1
        return result
