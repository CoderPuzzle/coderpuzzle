from collections import Counter
from typing import List, Optional


class Solution:
    def countPairs(self, deliciousness: List[int]) -> int:
        # A good meal needs two values summing to a power of two. Values
        # are capped at 2^20, so a sum never exceeds 2^21: exactly the 22
        # powers 2^0 .. 2^21 are possible targets and nothing else.
        # Counting how often each value occurs settles every pair at once.
        # For a distinct value v and a power p, the mate w = p - v
        # contributes count(v) * count(w) pairs when w > v, while w == v
        # (p equal to 2v exactly) contributes count(v) choose 2: the pairs
        # of equal-valued items at different indices. The raw total
        # reaches n * (n - 1) / 2, so it accumulates in Python's
        # arbitrary-width ints and reduces mod 10^9 + 7 at the end.
        MOD = 1_000_000_007
        count = Counter(deliciousness)
        total = 0
        for value, c in count.items():
            power = 1
            while power <= 1 << 21:
                mate = power - value
                if mate > value and mate in count:
                    total += c * count[mate]
                elif mate == value:
                    total += c * (c - 1) // 2
                power <<= 1
        return total % MOD
