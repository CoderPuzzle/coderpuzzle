from typing import List, Optional


class Solution:
    def findChampion(self, n: int, edges: List[List[int]]) -> int:
        # Anyone stronger than team a must end with an edge into a — either
        # directly or through a last hop that is itself an incoming edge —
        # so "no team is stronger than a" is exactly "a has no incoming
        # edge". Count incoming edges, keep the teams with none, and accept
        # only when that set holds a single champion.
        incoming = [0] * n
        for _, loser in edges:
            incoming[loser] += 1
        champions = [team for team in range(n) if incoming[team] == 0]
        return champions[0] if len(champions) == 1 else -1
