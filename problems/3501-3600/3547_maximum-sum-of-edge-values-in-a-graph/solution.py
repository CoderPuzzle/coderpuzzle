from typing import List


class Solution:
    def maxScore(self, n: int, edges: List[List[int]]) -> int:
        # Connected with every degree <= 2, the graph is one path
        # (m == n - 1) or one cycle (m == n). Pendulum the values 1..n —
        # 1, 3, 5, ... then ..., 6, 4, 2 — so the largest values sit side
        # by side and the small ones absorb the weak end adjacencies (the
        # wrap-around edge on a cycle).
        seq = list(range(1, n + 1, 2))
        seq += list(range(n if n % 2 == 0 else n - 1, 0, -2))
        score = sum(seq[i] * seq[i + 1] for i in range(n - 1))
        if len(edges) == n:
            score += seq[0] * seq[-1]
        return score
