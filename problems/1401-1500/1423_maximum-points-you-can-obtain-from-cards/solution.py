from typing import List, Optional


class Solution:
    def maxScore(self, cardPoints: List[int], k: int) -> int:
        n = len(cardPoints)
        total = sum(cardPoints)
        # taking k cards off the ends always leaves a contiguous middle block
        # of length n-k, so max score = total - min sum of a length n-k window
        window = n - k
        current = sum(cardPoints[:window])
        best = current
        for i in range(window, n):
            # slide one position: add the entering card, drop the leaving one
            current += cardPoints[i] - cardPoints[i - window]
            best = min(best, current)
        return total - best
