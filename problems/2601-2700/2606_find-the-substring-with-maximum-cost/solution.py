from typing import List


class Solution:
    def maximumCostSubstring(self, s: str, chars: str, vals: List[int]) -> int:
        # Resolve each letter's value once (defaults from the alphabet,
        # overrides from chars), then Kadane's algorithm; snapping the
        # running sum back to 0 whenever it dips negative keeps the empty
        # substring's cost of 0 as the floor for the answer.
        override = dict(zip(chars, vals))
        best = 0
        run = 0
        for ch in s:
            weight = override.get(ch, ord(ch) - 96)
            run = max(run + weight, 0)
            if run > best:
                best = run
        return best
