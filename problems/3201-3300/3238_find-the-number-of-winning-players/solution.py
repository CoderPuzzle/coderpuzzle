from typing import List


class Solution:
    def winningPlayerCount(self, n: int, pick: List[List[int]]) -> int:
        counts = [[0] * 11 for _ in range(n)]
        for player, color in pick:
            counts[player][color] += 1

        winners = 0
        for player in range(n):
            if max(counts[player]) > player:
                winners += 1
        return winners
