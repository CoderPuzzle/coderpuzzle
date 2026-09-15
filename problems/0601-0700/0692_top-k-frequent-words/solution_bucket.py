from typing import List, Optional


class Solution:
    def topKFrequent(self, words: List[str], k: int) -> List[str]:
        # One counting pass over the array.
        counts = {}
        for w in words:
            counts[w] = counts.get(w, 0) + 1
        # Buckets indexed by frequency: a word with count c lands in
        # buckets[c], and no count can exceed n.
        n = len(words)
        buckets = [[] for _ in range(n + 1)]
        for w, c in counts.items():
            buckets[c].append(w)
        result = []
        # Walk frequencies from the highest possible down; within one bucket
        # sort words ascending, so ties break alphabetically — and stop as
        # soon as k words are in hand.
        for c in range(n, 0, -1):
            bucket = buckets[c]
            if not bucket:
                continue
            bucket.sort()
            for w in bucket:
                result.append(w)
                if len(result) == k:
                    return result
        return result
