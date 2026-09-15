class Solution:
    def canWin(self, currentState: str) -> bool:
        # The player to move wins exactly when some flip of a "++" hands the
        # opponent a position from which they cannot win; a position with no
        # "++" left is a loss. A flip never crosses a '-', so the game
        # decomposes into independent '+'-runs: memoize on the sorted lengths
        # of the live runs (>= 2), which alone decide the position.
        memo = {}

        def can_win(runs: tuple) -> bool:
            live = tuple(sorted(run for run in runs if run >= 2))
            if live in memo:
                return memo[live]
            winner = False
            for index, run in enumerate(live):
                if winner:
                    break
                others = live[:index] + live[index + 1 :]
                # Flipping spot i inside `run` leaves runs i and run-2-i; the
                # mirror split makes the same successor, so half the range.
                for i in range((run - 2) // 2 + 1):
                    parts = tuple(part for part in (i, run - 2 - i) if part >= 2)
                    if not can_win(others + parts):
                        winner = True
                        break
            memo[live] = winner
            return winner

        # Every move consumes exactly two '+', so at most 30 moves stack up
        # even on the 60-char ceiling — comfortably inside CPython's default
        # recursion limit, no lift needed.
        return can_win(tuple(len(run) for run in currentState.split("-") if run))
