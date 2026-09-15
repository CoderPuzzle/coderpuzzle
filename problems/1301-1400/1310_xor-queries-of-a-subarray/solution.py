from typing import List, Optional


class Solution:
    def xorQueries(self, arr: List[int], queries: List[List[int]]) -> List[int]:
        # prefix[t] = XOR of the first t elements (prefix[0] = 0).
        prefix = [0]
        for x in arr:
            prefix.append(prefix[-1] ^ x)
        # Self-inverse XOR telescopes: elements before l appear in both
        # operands and annihilate, leaving exactly arr[l..r] — O(1) per query.
        return [prefix[r + 1] ^ prefix[l] for l, r in queries]
