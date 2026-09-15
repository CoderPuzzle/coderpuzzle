from typing import Counter, List


class Solution:
    def bestHand(self, ranks: List[int], suits: List[str]) -> str:
        # The hand types rank strictly best to worst, so the first condition
        # that holds decides: uniform suit is a flush; otherwise the largest
        # rank multiplicity picks Three of a Kind (>= 3), Pair (2), or High
        # Card. A count of 4 still qualifies as three of a kind.
        if all(suit == suits[0] for suit in suits):
            return "Flush"
        counts = Counter(ranks)
        best = max(counts.values())
        if best >= 3:
            return "Three of a Kind"
        if best == 2:
            return "Pair"
        return "High Card"
