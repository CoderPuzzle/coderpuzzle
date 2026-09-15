from typing import List


class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        # Suffix ANDs ending at one index take at most ~30 distinct values:
        # walking the left end rightward can only clear bits, so every value
        # change drops at least one bit. (value, count) buckets make the
        # scan O(n * 30) instead of enumerating all subarrays.
        total = 0
        buckets: List[List[int]] = []
        for value in nums:
            merged = [[value, 1]]
            for and_value, count in buckets:
                and_value &= value
                if merged[-1][0] == and_value:
                    merged[-1][1] += count
                else:
                    merged.append([and_value, count])
            buckets = merged
            for and_value, count in buckets:
                if and_value == k:
                    total += count
        return total
