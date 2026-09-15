from typing import List, Optional


class Solution:
    def maxLength(self, arr: List[str]) -> int:
        # A concatenation is fully described by which of the 26 letters it
        # holds, so each string becomes a bitmask; a self-repeating string
        # (mask -1) can never join a valid combination and is skipped later.
        masks = []
        for s in arr:
            mask = 0
            for ch in s:
                bit = 1 << (ord(ch) - ord("a"))
                if mask & bit:
                    mask = -1
                    break
                mask |= bit
            masks.append(mask)

        n = len(arr)
        best = 0

        def dfs(index, used):
            nonlocal best
            # The combination length is just the popcount of its mask.
            total = bin(used).count("1")
            if total > best:
                best = total
            # The start index only moves forward: each subsequence is tried
            # once in index order (length is order-independent). Compatible
            # strings are exactly those whose mask ANDs with `used` to zero.
            for j in range(index, n):
                if masks[j] != -1 and not (used & masks[j]):
                    dfs(j + 1, used | masks[j])

        dfs(0, 0)
        return best
