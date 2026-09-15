from typing import List


class Solution:
    def edgeScore(self, edges: List[int]) -> int:
        # Node edges[i] gains i to its score, so one accumulation pass fills
        # every score; a second pass picks the highest with the smallest
        # index (strict > keeps the earlier node on ties). Scores reach
        # ~n^2/2 = 5e9, past 32-bit range.
        scores = [0] * len(edges)
        for source, target in enumerate(edges):
            scores[target] += source
        best_node = 0
        for node in range(len(scores)):
            if scores[node] > scores[best_node]:
                best_node = node
        return best_node
