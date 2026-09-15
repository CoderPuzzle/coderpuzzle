from typing import List


class Solution:
    def numMovesStonesII(self, stones: List[int]) -> List[int]:
        stones.sort()
        n = len(stones)
        if stones[-1] - stones[0] == n - 1:
            # Already n consecutive integers: no legal move exists.
            return [0, 0]

        # Maximum: play it out from whichever side wastes fewer stones.
        # Losing the low side (never touching it) wastes stones[1] - stones[0]
        # of already-occupied span; losing the high side wastes
        # stones[-1] - stones[-2]. Take the larger resulting move count.
        max_moves = max(
            stones[-1] - stones[1] - (n - 2),
            stones[-2] - stones[0] - (n - 2),
        )

        # Minimum: slide a window of n consecutive integer values across the
        # sorted positions; a window already holding k stones needs n - k
        # moves to fill the rest.
        min_moves = n
        left = 0
        for right in range(n):
            while stones[right] - stones[left] + 1 > n:
                left += 1
            already_placed = right - left + 1
            cost = n - already_placed
            if cost == 1 and already_placed == n - 1 and stones[right] - stones[left] == n - 2:
                # Classic gotcha: n - 1 stones already packed with zero
                # gaps. The lone outside stone can't jump straight into
                # the missing slot without still being an endpoint, so it
                # needs a throwaway hop first -- 2 moves, not 1.
                cost = 2
            min_moves = min(min_moves, cost)

        return [min_moves, max_moves]
