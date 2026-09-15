from typing import List


class Solution:
    def maxTotal(self, nums: List[int], s: str) -> int:
        answer = 0
        index = 0
        while index < len(nums):
            if s[index] == "0":
                index += 1
                continue
            start = index
            while index < len(nums) and s[index] == "1":
                index += 1
            if start == 0:
                answer += sum(nums[start:index])
            else:
                values = nums[start - 1 : index]
                answer += sum(values) - min(values)
        return answer
