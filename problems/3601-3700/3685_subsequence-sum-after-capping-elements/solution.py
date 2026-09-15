from typing import List, Optional


class Solution:
    def subsequenceSumAfterCapping(self, nums: List[int], k: int) -> List[bool]:
        n = len(nums)
        mask = (1 << (k + 1)) - 1
        counts = [0] * (n + 1)
        for value in nums:
            counts[value] += 1
        reach = 1
        leq = 0
        answer = [False] * n
        for x in range(1, n + 1):
            for _ in range(counts[x]):
                reach |= (reach << x) & mask
            leq += counts[x]
            above = n - leq
            found = False
            multiple, remainder = 0, k
            while multiple <= above and remainder >= 0:
                if (reach >> remainder) & 1:
                    found = True
                    break
                multiple += 1
                remainder -= x
            answer[x - 1] = found
        return answer
