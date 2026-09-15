from collections import deque
from typing import List, Optional


class Solution:
    def deckRevealedIncreasing(self, deck: List[int]) -> List[int]:
        # Build the answer by playing the reveal backwards: place the cards
        # from the largest down to the smallest; before each placement the
        # bottom card of the ordering built so far moves to the top, undoing
        # one "put the next top card at the bottom".
        cards = deque()
        for card in sorted(deck, reverse=True):
            if cards:
                cards.appendleft(cards.pop())
            cards.appendleft(card)
        return list(cards)
