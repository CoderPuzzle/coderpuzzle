from typing import List


class Solution:
    def countOppositeParity(self, nums: List[int]) -> List[int]:
        even = 0
        odd = 0
        answer = [0] * len(nums)
        for i in range(len(nums) - 1, -1, -1):
            if nums[i] % 2 == 0:
                answer[i] = odd
                even += 1
            else:
                answer[i] = even
                odd += 1
        return answer
