from typing import List, Optional


class Solution:
    def numSquares(self, n: int) -> int:
        # The squares available as subtractions, ascending — so the inner
        # loop can break as soon as s exceeds the remainder.
        squares = [i * i for i in range(1, int(n**0.5) + 1)]
        # Level-by-level BFS over remainders: level k holds every value
        # reachable from n by subtracting exactly k squares.
        level = {n}
        seen = {n}
        steps = 0
        while level:
            steps += 1
            next_level = set()
            for r in level:
                for s in squares:
                    if s > r:
                        break
                    t = r - s
                    # Reaching 0 at this depth settles the answer.
                    if t == 0:
                        return steps
                    # First sight of a remainder is its shallowest depth; a
                    # revisit through another square can never beat it.
                    if t not in seen:
                        seen.add(t)
                        next_level.add(t)
            level = next_level
        # Lagrange's four-square theorem bounds the search at four levels,
        # so the loop always returns from inside.
        return steps
