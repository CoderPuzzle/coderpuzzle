from math import gcd


class Solution:
    def replaceNonCoprimes(self, nums: list[int]) -> list[int]:
        stack: list[int] = []
        for num in nums:
            current = num
            # keep absorbing into `current` while it shares a factor with
            # the processed value to its left
            while stack and gcd(stack[-1], current) > 1:
                top = stack.pop()
                current = top // gcd(top, current) * current
            stack.append(current)
        return stack
