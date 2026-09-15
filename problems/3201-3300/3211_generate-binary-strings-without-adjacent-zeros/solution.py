from typing import List


class Solution:
    def validStrings(self, n: int) -> List[str]:
        # A valid string never contains "00", so the choice at each position
        # depends only on the previous character: after a 0 the next char is
        # forced to be 1, after a 1 either character may follow. Appending 0
        # right after a 0 is the only move that can ever go wrong, so pruning
        # exactly that branch keeps every surviving path valid. Trying 0
        # before 1 makes the depth-first walk emit the strings already in
        # ascending lexicographic order — no final sort needed.
        results: List[str] = []
        chars: List[str] = []

        def backtrack() -> None:
            if len(chars) == n:
                results.append("".join(chars))
                return
            for ch in ("0", "1"):
                if ch == "0" and chars[-1:] == ["0"]:
                    continue  # would create "00" — prune this branch
                chars.append(ch)
                backtrack()
                chars.pop()

        backtrack()
        return results
