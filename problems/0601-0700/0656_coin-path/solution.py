from typing import List


class Solution:
    def cheapestJump(self, coins: List[int], maxJump: int) -> List[int]:
        # Suffix costs, built right to left: cost[i] is the cheapest total
        # for the rest of the walk when standing on i, coins[i] included,
        # while UNREACHABLE marks blocked or stranded cells and is never
        # added to. Scanning the window i+1..i+maxJump in increasing index
        # order and replacing the best only on a strict improvement leaves
        # next[i] at the SMALLEST index achieving the minimum continuation,
        # so the lexicographic tie rule is stored in the table itself.
        n = len(coins)
        UNREACHABLE = 101 * 1000 + 1  # above any real total (100 * 1000)
        cost = [UNREACHABLE] * n
        nxt = [-1] * n
        if coins[n - 1] != -1:
            cost[n - 1] = coins[n - 1]
        for i in range(n - 2, -1, -1):
            if coins[i] == -1:
                continue
            best = UNREACHABLE
            best_from = -1
            for j in range(i + 1, min(i + maxJump + 1, n)):
                if cost[j] < best:
                    best = cost[j]
                    best_from = j
            if best_from != -1:
                cost[i] = coins[i] + best
                nxt[i] = best_from
        if cost[0] == UNREACHABLE:
            return []
        # The walk from index 1 follows next[] and is the lexicographically
        # smallest minimum-cost path: at every divergence between two
        # equal-cost optimal paths the smaller next index wins outright,
        # whatever the remaining suffixes do.
        path = []
        i = 0
        while i != -1:
            path.append(i + 1)
            i = nxt[i]
        return path
