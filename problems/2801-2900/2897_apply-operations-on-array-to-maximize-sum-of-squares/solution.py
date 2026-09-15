from typing import List


class Solution:
    def maxSum(self, nums: List[int], k: int) -> int:
        MOD = 10**9 + 7

        # The operation replaces a pair with (a AND b, a OR b): the AND
        # keeps exactly the bits both values shared and the OR keeps exactly
        # the bits either had, so every bit position owns a fixed pool of
        # count[b] copies that operations merely reshuffle across the array.
        count = [0] * 30
        for x in nums:
            for b in range(30):
                if (x >> b) & 1:
                    count[b] += 1

        # Pour the pools into the k kept slots greedily, highest bit first:
        # a set bit raises a larger running value's square by more, so the
        # biggest slots take every bit first. Slot i then holds bit b exactly
        # when i sits below count[b], so one sweep from the OR of all present
        # bits - dropping bit b as the sweep passes index count[b] - walks
        # the final slot values directly.
        drop = {}
        value = 0
        for b in range(30):
            if count[b]:
                value |= 1 << b
                if count[b] < k:
                    drop[count[b]] = drop.get(count[b], 0) | (1 << b)

        total = 0
        for i in range(k):
            if i:
                value ^= drop.get(i, 0)
            # Slots stay below 2^30 but their squares reach ~1.15e18, so each
            # square is reduced modulo 10^9 + 7 as the total accumulates.
            total = (total + value * value) % MOD
        return total
