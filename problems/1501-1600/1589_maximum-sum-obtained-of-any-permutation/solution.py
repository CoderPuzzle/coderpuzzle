from typing import List

MOD = 1_000_000_007


class Solution:
    def maxSumRangeQuery(self, nums: List[int], requests: List[List[int]]) -> int:
        n = len(nums)
        # Difference array: +1 at the start of each request's range, -1 just
        # past its end; a prefix sum then turns this into per-index request
        # coverage counts instead of re-walking every request's range.
        diff = [0] * (n + 1)
        for start, end in requests:
            diff[start] += 1
            diff[end + 1] -= 1
        freq = [0] * n
        running = 0
        for i in range(n):
            running += diff[i]
            freq[i] = running
        # Rearrangement inequality: pairing the largest values with the
        # largest weights (both sorted descending) maximizes the sum of
        # pairwise products.
        sorted_nums = sorted(nums, reverse=True)
        freq.sort(reverse=True)
        total = 0
        for value, weight in zip(sorted_nums, freq):
            total += value * weight
        return total % MOD
