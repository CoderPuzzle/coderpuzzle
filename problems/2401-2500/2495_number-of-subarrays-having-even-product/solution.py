from typing import List


class Solution:
    def evenProduct(self, nums: List[int]) -> int:
        # A subarray has an even product iff it contains at least one even
        # element. Sweep the right endpoint left to right, remembering the
        # most recent even element's index: every left endpoint up to and
        # including it makes nums[left..i] even-product, contributing
        # lastEven + 1 subarrays ending here.
        answer = 0
        lastEven = -1
        for i, x in enumerate(nums):
            if x % 2 == 0:
                lastEven = i
            answer += lastEven + 1
        return answer
