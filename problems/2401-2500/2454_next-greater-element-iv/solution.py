from typing import List


class Solution:
    def secondGreaterElement(self, nums: List[int]) -> List[int]:
        n = len(nums)
        result = [-1] * n
        first: List[int] = []  # indices awaiting their first greater value
        second: List[int] = []  # indices awaiting their second greater value
        for i in range(n):
            x = nums[i]
            while second and nums[second[-1]] < x:
                result[second.pop()] = x
            batch: List[int] = []
            while first and nums[first[-1]] < x:
                batch.append(first.pop())
            # batch leaves the first stack in increasing value order; push it
            # back-to-front so the second stack keeps its smallest value on top
            for j in reversed(batch):
                second.append(j)
            first.append(i)
        return result
