from typing import List


class Solution:
    def loudAndRich(self, richer: List[List[int]], quiet: List[int]) -> List[int]:
        # Each pair [a, b] is an edge from a richer person to a poorer one,
        # so the people definitely at least as rich as x are x plus all its
        # ancestors in the DAG. A memoized DFS settles persons from the
        # known-poorest upward: once every direct richer neighbor of x has
        # settled, answer[x] folds in their answers, each of which already
        # covers that neighbor's whole chain.
        n = len(quiet)
        richer_of: List[List[int]] = [[] for _ in range(n)]
        for a, b in richer:
            richer_of[b].append(a)
        answer = list(range(n))
        settled = [False] * n
        for start in range(n):
            if settled[start]:
                continue
            stack = [[start, 0]]
            while stack:
                frame = stack[-1]
                x, i = frame
                if i < len(richer_of[x]):
                    frame[1] += 1
                    a = richer_of[x][i]
                    if not settled[a]:
                        stack.append([a, 0])
                else:
                    stack.pop()
                    for a in richer_of[x]:
                        if quiet[answer[a]] < quiet[answer[x]]:
                            answer[x] = answer[a]
                    settled[x] = True
        return answer
