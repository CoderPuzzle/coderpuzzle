from typing import List


class Solution:
    def minMaxGame(self, nums: List[int]) -> int:
        current = nums
        while len(current) > 1:
            nxt = []
            for i in range(len(current) // 2):
                if i % 2 == 0:
                    nxt.append(min(current[2 * i], current[2 * i + 1]))
                else:
                    nxt.append(max(current[2 * i], current[2 * i + 1]))
            current = nxt
        return current[0]
