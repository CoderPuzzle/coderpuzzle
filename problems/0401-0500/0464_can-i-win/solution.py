from typing import List, Optional


class Solution:
    def canIWin(self, maxChoosableInteger: int, desiredTotal: int) -> bool:
        # Target already reached before any move: the first player wins.
        if desiredTotal <= 0:
            return True
        # The whole pool cannot reach the target, so nobody ever wins.
        if maxChoosableInteger * (maxChoosableInteger + 1) // 2 < desiredTotal:
            return False

        # State = bitmask of used integers (m <= 20 keeps it to 2^m states);
        # `remaining` is derived from the mask, so memoizing on it suffices.
        memo = {}

        def can_win(state, remaining):
            cached = memo.get(state)
            if cached is not None:
                return cached
            for choice in range(1, maxChoosableInteger + 1):
                bit = 1 << (choice - 1)
                if state & bit:
                    continue
                # Immediate win on reaching the target, else the move wins
                # exactly when it strands the opponent in a losing state.
                if choice >= remaining or not can_win(state | bit, remaining - choice):
                    memo[state] = True
                    return True
            memo[state] = False
            return False

        return can_win(0, desiredTotal)
