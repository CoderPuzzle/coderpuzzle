from typing import List


class Solution:
    def maxPoints(self, technique1: List[int], technique2: List[int], k: int) -> int:
        # Taking technique 1 everywhere satisfies any k, so start there and
        # switch tasks to technique 2 in descending order of the gain
        # technique2[i] - technique1[i], never exceeding n - k switches.
        # A switch only helps while its gain is positive; because gains
        # arrive largest-first, every prefix is the best use of that many
        # switches, so the answer is the running maximum over those totals.
        total = sum(technique1)
        best = total
        gains = sorted((b - a for a, b in zip(technique1, technique2)), reverse=True)
        budget = len(technique1) - k
        for gain in gains:
            if budget == 0 or gain <= 0:
                break
            total += gain
            budget -= 1
            if total > best:
                best = total
        return best
