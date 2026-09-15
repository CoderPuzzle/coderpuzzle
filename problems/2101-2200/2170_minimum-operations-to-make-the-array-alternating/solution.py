from typing import List


class Solution:
    def minimumOperations(self, nums: List[int]) -> int:
        # An alternating array is fixed by one value for even indices and one
        # different value for odd indices, so the kept elements are exactly
        # the most frequent value on each side. Count both parities in one
        # pass, then keep the best of the four top-1/top-2 combinations.
        n = len(nums)
        if n == 1:
            return 0
        even_counts = {}
        odd_counts = {}
        for index, value in enumerate(nums):
            counts = even_counts if index % 2 == 0 else odd_counts
            counts[value] = counts.get(value, 0) + 1

        # Top values per parity plus a fresh fill value worth nothing: the
        # optimal partner need not occur anywhere in nums, which resolves the
        # both-sides-same-mode collision even without a second choice.
        fresh_value = max(nums) + 1

        def candidates(counts):
            ranked = sorted(counts.items(), key=lambda item: -item[1])[:2]
            return [(value, count) for value, count in ranked] + [(fresh_value, 0)]

        best = n
        for even_value, even_kept in candidates(even_counts):
            for odd_value, odd_kept in candidates(odd_counts):
                if even_value == odd_value:
                    continue
                best = min(best, n - even_kept - odd_kept)
        return best
