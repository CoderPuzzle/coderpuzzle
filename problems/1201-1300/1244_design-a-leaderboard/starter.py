from typing import List, Optional


class Leaderboard:
    def __init__(self):
        raise NotImplementedError("TODO")

    def addScore(self, playerId: int, score: int):
        raise NotImplementedError("TODO")

    def top(self, K: int) -> int:
        raise NotImplementedError("TODO")

    def reset(self, playerId: int):
        raise NotImplementedError("TODO")
