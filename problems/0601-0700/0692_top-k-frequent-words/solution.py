from typing import List, Optional

import heapq


class _Rev:
    """A word that orders lexicographically backwards."""

    __slots__ = ("word",)

    def __init__(self, word: str) -> None:
        self.word = word

    def __lt__(self, other: "_Rev") -> bool:
        return self.word > other.word


class Solution:
    def topKFrequent(self, words: List[str], k: int) -> List[str]:
        # One counting pass over the array.
        counts = {}
        for w in words:
            counts[w] = counts.get(w, 0) + 1
        # Size-k min-heap keyed (count, _Rev(word)): the root is the weakest
        # keeper — smallest count, and among equal counts the largest word —
        # so eviction order mirrors the final ranking.
        heap = []
        for word, count in counts.items():
            entry = (count, _Rev(word))
            if len(heap) < k:
                heapq.heappush(heap, entry)
            elif entry > heap[0]:
                # Replace the root only when the newcomer outranks it:
                # higher count, or equal count and smaller word.
                heapq.heapreplace(heap, entry)
        # Survivors are exactly the top k by (higher count, then smaller
        # word); emit them in that order.
        heap.sort(key=lambda entry: (-entry[0], entry[1].word))
        return [entry[1].word for entry in heap]
