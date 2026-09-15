from typing import List, Optional


class Solution:
    def maxChunksToSorted(self, arr: List[int]) -> int:
        # A boundary is legal exactly when the multiset of arr's prefix
        # equals the sorted copy's prefix — values repeat, so multisets,
        # not max/min ranges, decide.
        ordered = sorted(arr)
        counts = {}
        balance = 0
        chunks = 0
        for a, b in zip(arr, ordered):
            # Each update adds +1 when it leaves a count nonzero (a new
            # unpaired element) and -1 when it brings one back to zero.
            counts[a] = counts.get(a, 0) + 1
            balance += 1 if counts[a] > 0 else -1
            counts[b] = counts.get(b, 0) - 1
            balance += 1 if counts[b] < 0 else -1
            # Zero balance = no unpaired elements: the prefix multisets
            # agree, so cut a chunk at the earliest such index.
            if balance == 0:
                chunks += 1
        return chunks
