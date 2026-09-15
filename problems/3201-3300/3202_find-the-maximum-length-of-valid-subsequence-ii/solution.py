from typing import List


class Solution:
    def maximumLength(self, nums: List[int], k: int) -> int:
        # A valid subsequence's adjacent sums share one unknown residue,
        # so try each candidate val in [0, k). While streaming nums under
        # a fixed val, dp[r] is the best chain whose last element is r
        # mod k; appending an element of residue r needs a previous
        # element at residue (val - r) % k, and a lone element always
        # restarts a chain of one. Python's % is already non-negative.
        residues = [value % k for value in nums]
        best = 0
        for val in range(k):
            dp = [0] * k
            for r in residues:
                prev = dp[(val - r) % k]
                length = prev + 1 if prev >= 1 else 1
                if length > dp[r]:
                    dp[r] = length
            best = max(best, max(dp))
        return best
