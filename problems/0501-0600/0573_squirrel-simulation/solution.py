from typing import List


class Solution:
    def minDistance(self, height: int, width: int, tree: List[int], squirrel: List[int], nuts: List[List[int]]) -> int:
        total = 0
        best = None
        for nut in nuts:
            # Once the first nut is under the tree, every remaining nut is a
            # tree -> nut -> tree round trip, so 2 * dist(nut, tree) is paid
            # no matter what.
            to_tree = abs(nut[0] - tree[0]) + abs(nut[1] - tree[1])
            total += 2 * to_tree
            # Starting with this nut instead swaps one round trip for
            # squirrel -> nut -> tree, changing the total by the detour
            # dist(squirrel, nut) - dist(nut, tree).
            detour = abs(nut[0] - squirrel[0]) + abs(nut[1] - squirrel[1]) - to_tree
            if best is None or detour < best:
                best = detour
        return total + best
