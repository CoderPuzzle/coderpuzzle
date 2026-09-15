from typing import List, Optional


class Solution:
    def longestCommonPrefix(self, arr1: List[int], arr2: List[int]) -> int:
        # A shared prefix of length L means the first L decimal digits agree,
        # so collect every decimal prefix of arr1 into a set.
        prefixes = set()
        for x in arr1:
            v = 0
            # Fold digits left to right; each intermediate v is one prefix of x.
            for ch in str(x):
                v = v * 10 + (ord(ch) - 48)
                prefixes.add(v)
        best = 0
        for y in arr2:
            v = 0
            for i, ch in enumerate(str(y)):
                v = v * 10 + (ord(ch) - 48)
                if v in prefixes:
                    if i + 1 > best:
                        best = i + 1
                else:
                    # Prefixes nest: once one length of y misses, no longer
                    # prefix of y can match either.
                    break
        return best
