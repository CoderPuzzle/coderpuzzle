from typing import List, Optional


class Solution:
    def kConcatenationMaxSum(self, arr: List[int], k: int) -> int:
        MOD = 10**9 + 7

        # the best subarray never needs more than two partial copies plus
        # whole copies in between, so Kadane over two copies plus prefix
        # and suffix sums cover every candidate
        def kadane(values):
            best = 0
            current = 0
            for value in values:
                # clamped at 0: the empty subarray is always an option
                current = max(current + value, 0)
                best = max(best, current)
            return best

        def max_prefix(values):
            best = 0
            current = 0
            for value in values:
                current += value
                best = max(best, current)
            return best

        def max_suffix(values):
            best = 0
            current = 0
            for value in reversed(values):
                current += value
                best = max(best, current)
            return best

        total = sum(arr)
        if k == 1:
            return kadane(arr) % MOD
        # two adjacent copies cover every boundary-hugging candidate
        best = kadane(arr + arr)
        if k > 2 and total > 0:
            # whole middle copies pay off only when total > 0: score the
            # best suffix + best prefix + (k - 2) full copies
            best = max(best, max_suffix(arr) + max_prefix(arr) + (k - 2) * total)
        # reduce only at the end — residues no longer compare by magnitude
        return best % MOD
