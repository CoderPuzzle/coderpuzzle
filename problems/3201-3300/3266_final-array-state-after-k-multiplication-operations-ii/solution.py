import heapq
from typing import List, Optional


class Solution:
    def getFinalState(self, nums: List[int], k: int, multiplier: int) -> List[int]:
        MOD = 10**9 + 7
        n = len(nums)
        result = [0] * n
        if multiplier == 1:
            # x * 1 == x forever: no operation ever moves a value.
            return [v % MOD for v in nums]
        heap = [(v, i) for i, v in enumerate(nums)]
        heapq.heapify(heap)
        top = max(nums)
        # Simulate while the product stays within max(nums): every applied
        # value then lands at or below top, so top itself never grows and
        # each element is multiplied at most log2(top) times in this phase.
        while k > 0 and heap[0][0] * multiplier <= top:
            value, index = heapq.heappop(heap)
            heapq.heappush(heap, (value * multiplier, index))
            k -= 1
        if k > 0:
            # Crossover reached: multiplying the smallest now lifts it above
            # everything else, so later operations cycle through the entries
            # in non-decreasing (value, index) order. Each round scales all
            # n values by the multiplier, which preserves that inequality,
            # so the leftover k operations split into q full rounds plus one
            # extra exponent for the first rem entries of the sorted order.
            ordered = sorted(heap)
            q, rem = divmod(k, n)
            for pos, (value, index) in enumerate(ordered):
                exponent = q + (1 if pos < rem else 0)
                result[index] = value * pow(multiplier, exponent, MOD) % MOD
        else:
            for value, index in heap:
                result[index] = value % MOD
        return result
