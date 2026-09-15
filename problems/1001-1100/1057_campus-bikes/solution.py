from typing import List


class Solution:
    def assignBikes(self, workers: List[List[int]], bikes: List[List[int]]) -> List[int]:
        # Build one (distance, worker index, bike index) triple per pair and
        # sort ascending by distance, then worker index, then bike index —
        # exactly the tie-break the statement specifies. Walking the sorted
        # triples and assigning the first time both sides are still free
        # reproduces the statement's own greedy process.
        n, m = len(workers), len(bikes)
        triples = []
        for i in range(n):
            wx, wy = workers[i]
            for j in range(m):
                bx, by = bikes[j]
                distance = abs(wx - bx) + abs(wy - by)
                triples.append((distance, i, j))
        triples.sort()

        result = [-1] * n
        used_bike = [False] * m
        assigned = 0
        for _distance, i, j in triples:
            if result[i] != -1 or used_bike[j]:
                continue
            result[i] = j
            used_bike[j] = True
            assigned += 1
            if assigned == n:
                break
        return result
