from bisect import bisect_right
from itertools import accumulate
from typing import List


class Solution:
    def maximumCoins(self, heroes: List[int], monsters: List[int], coins: List[int]) -> List[int]:
        # A hero that beats one monster beats every monster of smaller-or-equal
        # power too, so sorting (power, coin) pairs makes each answer a prefix
        # sum over that order: binary-search how many monsters sit at or below
        # the hero's power and read prefix[k]. Totals reach 10^5 * 10^9 = 10^11,
        # well past 32 bits; Python ints are arbitrary precision.
        pairs = sorted(zip(monsters, coins))
        powers = [power for power, _ in pairs]
        prefix = [0]
        prefix.extend(accumulate(coin for _, coin in pairs))
        return [prefix[bisect_right(powers, hero)] for hero in heroes]
