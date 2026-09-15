from typing import List, Optional


class Solution:
    def maxStarSum(self, vals: List[int], edges: List[List[int]], k: int) -> int:
        # Store neighbor values (not indices) while reading edges, so each
        # center later sees its candidates directly.
        neighbors = [[] for _ in vals]
        for a, b in edges:
            neighbors[a].append(vals[b])
            neighbors[b].append(vals[a])
        # The center alone is a legal star: seed with the best single
        # value, never 0, so all-negative inputs stay negative.
        best = max(vals)
        for i, adjacent in enumerate(neighbors):
            # For a fixed center the best subset is greedy: sorted
            # descending, take neighbors while they help.
            adjacent.sort(reverse=True)
            total = vals[i]
            for value in adjacent[:k]:
                # A non-positive neighbor can only lower the sum.
                if value <= 0:
                    break
                total += value
            if total > best:
                best = total
        return best
