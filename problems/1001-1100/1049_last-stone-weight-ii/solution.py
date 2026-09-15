from typing import List


class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        # Smash order is irrelevant: the last stone is a signed sum, so the
        # task is a two-group partition minimizing the difference of sums.
        total = sum(stones)
        # With group A + group B = total fixed, minimizing total - 2*sum(A)
        # means pushing sum(A) as close to total/2 as possible.
        target = total // 2
        reachable = [False] * (target + 1)
        reachable[0] = True
        for value in stones:
            # Descend so a stone can't be counted twice in the same sum.
            for s in range(target, value - 1, -1):
                if reachable[s - value]:
                    reachable[s] = True
        best = next(s for s in range(target, -1, -1) if reachable[s])
        return total - 2 * best
