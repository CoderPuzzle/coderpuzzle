from typing import List


class Solution:
    def maximumSum(self, nums: List[int]) -> int:
        best_by_digit_sum: dict[int, int] = {}
        answer = -1
        for num in nums:
            digit_sum = sum(int(digit) for digit in str(num))
            if digit_sum in best_by_digit_sum:
                answer = max(answer, best_by_digit_sum[digit_sum] + num)
                best_by_digit_sum[digit_sum] = max(best_by_digit_sum[digit_sum], num)
            else:
                best_by_digit_sum[digit_sum] = num
        return answer
