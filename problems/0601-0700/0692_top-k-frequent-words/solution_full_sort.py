from typing import List, Optional


class Solution:
    def topKFrequent(self, words: List[str], k: int) -> List[str]:
        # One counting pass over the array.
        counts = {}
        for w in words:
            counts[w] = counts.get(w, 0) + 1
        # Sort every unique word under the statement's total order — count
        # descending, then word ascending — and keep the first k.
        ranked = sorted(counts, key=lambda word: (-counts[word], word))
        return ranked[:k]
