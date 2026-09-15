import math
from typing import List


class Solution:
    def numGoodSubarrays(self, nums: List[int], k: int) -> int:
        # Positional sweep: window [l, r] is good exactly when the prefixes
        # before l and through r leave the same remainder mod k.
        residue_counts = {0: 1}
        residue = 0
        total = 0
        for value in nums:
            residue = (residue + value) % k
            seen = residue_counts.get(residue, 0)
            total += seen
            residue_counts[residue] = seen + 1
        # Identical value sequences repeat only inside one run of equal
        # values: a span crossing a strict increase is pinned by where it
        # crosses and how much it takes from each edge. A qualifying length L
        # inside a run of length a occupies a - L + 1 positions but counts
        # once, so subtract the a - L excess of every qualifying length. The
        # qualifying lengths are multiples of k / gcd(v, k).
        i = 0
        n = len(nums)
        while i < n:
            j = i
            while j < n and nums[j] == nums[i]:
                j += 1
            run_length = j - i
            step = k // math.gcd(nums[i], k)
            repeated = run_length // step
            total -= repeated * run_length - step * repeated * (repeated + 1) // 2
            i = j
        return total
