class Leaderboard:
    """A player-id -> score map; top(K) sorts the values on demand."""

    def __init__(self):
        self.scores = {}

    def addScore(self, playerId: int, score: int):
        self.scores[playerId] = self.scores.get(playerId, 0) + score

    def top(self, K: int) -> int:
        # Removing on reset (not zeroing) keeps zeros out of this sort.
        return sum(sorted(self.scores.values(), reverse=True)[:K])

    def reset(self, playerId: int):
        del self.scores[playerId]
