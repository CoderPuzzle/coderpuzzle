from typing import List


class Solution:
    def minOperations(self, nums: List[int]) -> int:
        # Prefix index 0 can only be fixed by a flip at i = 0, and after
        # fixing it nothing may flip it again — so a left-to-right sweep
        # is forced. flips parity tells whether the suffix has been
        # inverted an odd number of times so far; each effective 0 (bit
        # inverted by prior flips) forces one more flip here, which also
        # re-inverts every later position at once.
        ops = 0
        flips = 0
        for bit in nums:
            if bit ^ (flips & 1) == 0:
                ops += 1
                flips += 1
        return ops
