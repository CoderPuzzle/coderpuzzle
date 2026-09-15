from typing import List


class Solution:
    def maxSum(self, nums: List[int]) -> int:
        best_by_largest_digit: dict[int, int] = {}
        answer = -1
        for num in nums:
            largest_digit = max(int(digit) for digit in str(num))
            if largest_digit in best_by_largest_digit:
                answer = max(answer, best_by_largest_digit[largest_digit] + num)
                best_by_largest_digit[largest_digit] = max(best_by_largest_digit[largest_digit], num)
            else:
                best_by_largest_digit[largest_digit] = num
        return answer
