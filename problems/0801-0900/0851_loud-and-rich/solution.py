from typing import List


class Solution:
    def loudAndRich(self, richer: List[List[int]], quiet: List[int]) -> List[int]:
        # Each pair [a, b] is an edge from a richer person to a poorer one,
        # so the people definitely at least as rich as x are x plus all its
        # ancestors in the DAG. A Kahn sweep settles persons from the
        # known-richest downward: once every richer neighbor of b has
        # relaxed its answer into b, answer[b] holds the least quiet person
        # among them all.
        n = len(quiet)
        poorer: List[List[int]] = [[] for _ in range(n)]
        pending = [0] * n
        for a, b in richer:
            poorer[a].append(b)
            pending[b] += 1
        answer = list(range(n))
        order = [x for x in range(n) if pending[x] == 0]
        for x in order:
            for b in poorer[x]:
                if quiet[answer[x]] < quiet[answer[b]]:
                    answer[b] = answer[x]
                pending[b] -= 1
                if pending[b] == 0:
                    order.append(b)
        return answer
