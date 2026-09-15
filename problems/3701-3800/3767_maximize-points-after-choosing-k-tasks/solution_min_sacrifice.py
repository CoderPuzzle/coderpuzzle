from typing import List


class Solution:
    def maxPoints(self, technique1: List[int], technique2: List[int], k: int) -> int:
        # Start from the best-of-both baseline: each task pays its larger
        # value. Tasks where technique 1 already wins count toward the
        # quota for free; every task where technique 2 wins must pay back
        # its win (technique2[i] - technique1[i]) whenever the free count
        # falls short of k, and paying back the smallest losses first is
        # plainly optimal. No sort of the whole array is needed.
        base = 0
        losses = []
        free = 0
        for a, b in zip(technique1, technique2):
            if a >= b:
                base += a
                free += 1
            else:
                base += b
                losses.append(b - a)
        forced = k - free
        if forced > 0:
            losses.sort()
            base -= sum(losses[:forced])
        return base
