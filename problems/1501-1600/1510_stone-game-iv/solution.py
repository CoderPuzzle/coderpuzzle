class Solution:
    def winnerSquareGame(self, n: int) -> bool:
        # wins[i] is True exactly when the player to move, facing a pile of
        # i stones, can force a win with optimal play from both sides.
        wins = [False] * (n + 1)
        for total in range(1, n + 1):
            k = 1
            while k * k <= total:
                # Removing k*k stones hands the opponent a pile of size
                # total - k*k. If that leaves the opponent in a losing
                # state, the mover wins by making this exact move.
                if not wins[total - k * k]:
                    wins[total] = True
                    break
                k += 1
        return wins[n]
