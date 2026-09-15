from typing import List, Optional


class Solution:
    def numsSameConsecDiff(self, n: int, k: int) -> List[int]:
        # Seed the queue with the nine legal first digits. A seed is
        # never 0 and growth only appends digits, so no number grown
        # from these seeds can carry a leading zero.
        queue = list(range(1, 10))
        # Grow every prefix by one digit, n - 1 times. A prefix that
        # ends in d can only continue with d - k or d + k — any other
        # next digit would break the consecutive-difference rule at
        # that pair already — and a continuation outside 0..9 is
        # dropped on the spot.
        for _ in range(n - 1):
            grown = []
            for prefix in queue:
                last = prefix % 10
                low, high = last - k, last + k
                if low >= 0:
                    grown.append(prefix * 10 + low)
                # k = 0 makes the two continuations the same digit;
                # take it once.
                if high <= 9 and high != low:
                    grown.append(prefix * 10 + high)
            queue = grown
        # Each round preserved the rule on the pair it touched, so the
        # final queue is exactly the answer set. Sorting states the
        # pinned ascending order in code.
        return sorted(queue)
