from typing import List


class Solution:
    def minAdjacentSwaps(self, nums: List[int], a: int, b: int) -> int:
        modulus = 1_000_000_007
        counts = [0, 0, 0]
        answer = 0
        for value in nums:
            group = 0 if value < a else (1 if value <= b else 2)
            if group == 0:
                answer += counts[1] + counts[2]
            elif group == 1:
                answer += counts[2]
            counts[group] += 1
        return answer % modulus
