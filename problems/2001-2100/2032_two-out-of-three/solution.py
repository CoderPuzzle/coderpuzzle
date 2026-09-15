from typing import List


class Solution:
    def twoOutOfThree(self, nums1: List[int], nums2: List[int], nums3: List[int]) -> List[int]:
        masks = [0] * 101
        for bit, nums in enumerate((nums1, nums2, nums3)):
            for value in nums:
                masks[value] |= 1 << bit

        return [value for value in range(1, 101) if masks[value] & (masks[value] - 1)]
