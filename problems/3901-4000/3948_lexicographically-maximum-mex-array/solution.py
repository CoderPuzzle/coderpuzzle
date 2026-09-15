from typing import List


class Solution:
    def maximumMEX(self, nums: List[int]) -> List[int]:
        n = len(nums)
        frequency = [0] * (n + 1)
        for value in nums:
            if value <= n:
                frequency[value] += 1
        mex = 0
        while frequency[mex] > 0:
            mex += 1
        answer = []
        index = 0
        while index < n:
            answer.append(mex)
            if mex == 0:
                value = nums[index]
                if value <= n:
                    frequency[value] -= 1
                index += 1
                continue
            seen = [False] * mex
            missing = mex
            next_mex = mex
            while missing:
                value = nums[index]
                if value <= n:
                    frequency[value] -= 1
                    if frequency[value] == 0 and value < next_mex:
                        next_mex = value
                if value < mex and not seen[value]:
                    seen[value] = True
                    missing -= 1
                index += 1
            mex = next_mex
        return answer
