from typing import List


class Solution:
    def maxSubarraySum(self, nums: List[int], k: int) -> int:
        negative_infinity = -(10**30)
        none_state = negative_infinity
        multiply = negative_infinity
        divide = negative_infinity
        done = negative_infinity
        answer = negative_infinity

        def truncated(value: int) -> int:
            return (value // k) if value >= 0 else -((-value) // k)

        for value in nums:
            multiplied = value * k
            divided = truncated(value)
            previous_none = none_state
            previous_multiply = multiply
            previous_divide = divide
            previous_done = done
            none_state = max(value, previous_none + value)
            multiply = max(multiplied, previous_none + multiplied, previous_multiply + multiplied)
            divide = max(divided, previous_none + divided, previous_divide + divided)
            done = max(previous_multiply + value, previous_divide + value, previous_done + value)
            answer = max(answer, none_state, multiply, divide, done)
        return answer
