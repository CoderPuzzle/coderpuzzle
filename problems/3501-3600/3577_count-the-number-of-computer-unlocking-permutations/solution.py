from typing import List


class Solution:
    def countPermutations(self, complexity: List[int]) -> int:
        # Computer i can only be unlocked through some already-unlocked
        # j < i with lower complexity, so the leftmost minimum of the whole
        # array can never be unlocked unless it is computer 0 itself: no
        # smaller label exists to unlock it through. Hence the answer is
        # (n - 1)! when complexity[0] is the strict minimum, else 0.
        MOD = 10**9 + 7
        if any(value <= complexity[0] for value in complexity[1:]):
            return 0
        count = 1
        for multiplier in range(2, len(complexity)):
            count = count * multiplier % MOD
        return count
