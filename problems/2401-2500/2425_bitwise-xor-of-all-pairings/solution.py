from typing import List, Optional


class Solution:
    def xorAllNums(self, nums1: List[int], nums2: List[int]) -> int:
        # Each a_i appears m times and each b_j n times in the n*m pair XORs;
        # even counts self-cancel, so only parity survives.
        answer = 0
        if len(nums2) % 2 == 1:
            # m odd: nums1's overall XOR does not cancel.
            for value in nums1:
                answer ^= value
        if len(nums1) % 2 == 1:
            # n odd: nums2's overall XOR does not cancel.
            for value in nums2:
                answer ^= value
        return answer
