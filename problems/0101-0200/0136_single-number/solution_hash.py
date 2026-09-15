from typing import List, Optional


class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        # Parity hash set: the first sight of a value adds it, the second
        # removes it — a paired element erases its own trace, so the set
        # holds exactly the values seen an odd number of times.
        seen = set()
        for value in nums:
            if value in seen:
                seen.remove(value)
            else:
                seen.add(value)
        # Fold the odd-count survivors with XOR: even-count values cancel
        # in any XOR fold anyway, so this equals folding the whole array.
        result = 0
        for value in seen:
            result ^= value
        return result
