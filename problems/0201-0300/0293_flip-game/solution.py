from typing import List


class Solution:
    def generatePossibleNextMoves(self, currentState: str) -> List[str]:
        states: List[str] = []
        # One left-to-right scan: every position whose two characters are
        # both '+' is exactly one legal move, and ascending i emits the
        # states in the pinned order — the earlier flipped pair first.
        for i in range(len(currentState) - 1):
            if currentState[i] == "+" and currentState[i + 1] == "+":
                # Keep both ends of the string, burn only the pair.
                states.append(currentState[:i] + "--" + currentState[i + 2 :])
        # A string with no "++" anywhere leaves the list empty — no valid move.
        return states
