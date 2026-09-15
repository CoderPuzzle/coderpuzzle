from typing import List


class Solution:
    def getMaximumXor(self, nums: List[int], maximumBit: int) -> List[int]:
        # Every value sits below 2^maximumBit, so the running XOR does too,
        # and XOR with a fixed prefix is a bijection on that range: the
        # maximum of prefix ^ k is reached exactly at k = mask ^ prefix,
        # where mask = 2^maximumBit - 1. Removing the last element just
        # XORs it back out of the running total, so one backward walk
        # answers every prefix without recomputing anything.
        mask = (1 << maximumBit) - 1
        running = 0
        for value in nums:
            running ^= value
        answer = []
        for value in reversed(nums):
            answer.append(running ^ mask)
            running ^= value
        return answer
