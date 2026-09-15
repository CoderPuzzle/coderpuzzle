from typing import List, Optional


class Solution:
    def sumOfPower(self, nums: List[int]) -> int:
        MOD = 10**9 + 7
        nums = sorted(nums)
        ans = 0
        # s = sum of v * 2^(elements after v) over the processed prefix: each
        # earlier minimum's (minimum, padding) variants, collapsed into one
        # accumulator so a group's power x^2 * min is summed without
        # enumerating subsets.
        s = 0
        for x in nums:
            # x is the group maximum here; the + x covers the singleton group
            # where x is its own minimum. Folded under the modulus since raw
            # values reach (10^9)^3.
            ans = (ans + (x * x % MOD) * ((s + x) % MOD)) % MOD
            # Advancing the sweep: every existing combination survives with
            # or without x as padding (doubling s), and x registers as a
            # fresh minimum.
            s = (2 * s + x) % MOD
        return ans
