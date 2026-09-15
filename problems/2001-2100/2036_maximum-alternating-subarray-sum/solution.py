from typing import List


class Solution:
    def maximumAlternatingSubarraySum(self, nums: List[int]) -> int:
        plus = nums[0]
        minus = 0
        has_minus = False
        answer = plus

        for value in nums[1:]:
            new_plus = value
            if has_minus:
                new_plus = max(new_plus, minus + value)
            new_minus = plus - value

            answer = max(answer, new_plus, new_minus)
            plus = new_plus
            minus = new_minus
            has_minus = True

        return answer
