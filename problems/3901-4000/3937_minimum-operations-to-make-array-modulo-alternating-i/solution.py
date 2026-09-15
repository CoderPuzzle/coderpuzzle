from typing import List


class Solution:
    def minOperations(self, nums: List[int], k: int) -> int:
        remainders = [value % k for value in nums]
        answer = 10**18
        for x in range(k):
            for y in range(k):
                if x == y:
                    continue
                total = 0
                for i, current in enumerate(remainders):
                    target = x if i % 2 == 0 else y
                    total += min((target - current) % k, (current - target) % k)
                answer = min(answer, total)
        return answer
