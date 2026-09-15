from operator import add
from typing import List


class Solution:
    def maxScore(self, n: int, k: int, stayScore: List[List[int]], travelScore: List[List[int]]) -> int:
        # dp[j] is the best score after the processed days with the tourist
        # in city j; every city starts at 0, which encodes the free choice
        # of the starting city. Each day, city j is either stayed in
        # (dp[j] + stayScore[i][j]) or reached by a move c -> j
        # (dp[c] + travelScore[c][j]). The c == j term is a 0-point no-op
        # (travelScore[i][i] == 0); keeping it inside the max is harmless,
        # since replacing a no-op day with a stay never lowers the score.
        columns = list(zip(*travelScore))
        dp = [0] * n
        for i in range(k):
            reached = [max(map(add, dp, column)) for column in columns]
            dp = [max(stay + current, moved) for stay, current, moved in zip(stayScore[i], dp, reached)]
        return max(dp)
