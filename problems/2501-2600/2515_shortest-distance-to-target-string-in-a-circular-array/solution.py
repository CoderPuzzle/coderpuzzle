from typing import List


class Solution:
    def closestTarget(self, words: List[str], target: str, startIndex: int) -> int:
        # Going either way around the ring, a match at distance d (forward)
        # is also n - d backward, so each matching index yields
        # min(d, n - d); take the smallest over all matches.
        n = len(words)
        best = -1
        for i, word in enumerate(words):
            if word != target:
                continue
            d = min(abs(i - startIndex), n - abs(i - startIndex))
            best = d if best == -1 else min(best, d)
        return best
