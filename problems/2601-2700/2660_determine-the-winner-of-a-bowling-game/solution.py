from typing import List


class Solution:
    def isWinner(self, player1: List[int], player2: List[int]) -> int:
        # A turn is worth double the pins when either of the two previous
        # turns was a strike (10); each score is one linear pass.
        def score(values: List[int]) -> int:
            total = 0
            for index, pins in enumerate(values):
                doubled = any(values[j] == 10 for j in range(max(0, index - 2), index))
                total += 2 * pins if doubled else pins
            return total

        score1 = score(player1)
        score2 = score(player2)
        if score1 > score2:
            return 1
        if score2 > score1:
            return 2
        return 0
