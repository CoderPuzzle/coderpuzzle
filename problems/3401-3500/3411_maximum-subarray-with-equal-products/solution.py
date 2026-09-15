from math import gcd


class Solution:
    def maxLength(self, nums: List[int]) -> int:
        # Elements are at most 10, so any lcm divides 2520 and any gcd is
        # at most 10: once the running product passes 25200 it can never
        # equal lcm * gcd again, so the inner walk can stop early.
        n = len(nums)
        ans = 0
        for left in range(n):
            prod, g, m = 1, 0, 1
            for right in range(left, n):
                x = nums[right]
                prod *= x
                g = gcd(g, x)
                m = m * x // gcd(m, x)
                if prod == m * g:
                    ans = max(ans, right - left + 1)
                elif prod > 25200:
                    break
        return ans
