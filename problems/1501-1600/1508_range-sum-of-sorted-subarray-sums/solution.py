from typing import List

MOD = 1_000_000_007


class Solution:
    def rangeSum(self, nums: List[int], n: int, left: int, right: int) -> int:
        # Every subarray sum, generated with a running total per start index
        # so each end index adds O(1) work instead of re-summing nums[i..j].
        sums = []
        for i in range(n):
            running = 0
            for j in range(i, n):
                running += nums[j]
                sums.append(running)
        sums.sort()
        # 1-indexed [left, right] window, reduced modulo 1e9 + 7 as we go —
        # the raw total can exceed a 32-bit accumulator even though no
        # single subarray sum does.
        total = 0
        for value in sums[left - 1 : right]:
            total = (total + value) % MOD
        return total
