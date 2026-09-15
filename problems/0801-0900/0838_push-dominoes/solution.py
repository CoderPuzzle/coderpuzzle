from typing import List, Optional


class Solution:
    def pushDominoes(self, dominoes: str) -> str:
        n = len(dominoes)
        # Skip simulation: accumulate signed force. Left to right, an
        # R plants a sentinel force n and an L kills it; the force
        # decays one per step and never drops below zero.
        forces = [0] * n
        f = 0
        for i in range(n):
            if dominoes[i] == "R":
                f = n
            elif dominoes[i] == "L":
                f = 0
            else:
                f = max(f - 1, 0)
            forces[i] += f
        # Mirror pass: L plants the force and R blocks it; subtracting
        # leaves the difference between the opposing pushes.
        f = 0
        for i in range(n - 1, -1, -1):
            if dominoes[i] == "L":
                f = n
            elif dominoes[i] == "R":
                f = 0
            else:
                f = max(f - 1, 0)
            forces[i] -= f
        # Sign decides: positive falls right, negative left, and zero
        # means the pushes balance — or nothing reached it.
        return "".join("." if forces[i] == 0 else ("R" if forces[i] > 0 else "L") for i in range(n))
