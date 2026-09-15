from typing import List, Optional


class Solution:
    def prefixesDivBy5(self, nums: List[int]) -> List[bool]:
        answer = []
        rem = 0
        for bit in nums:
            rem = (rem * 2 + bit) % 5
            answer.append(rem == 0)
        return answer
