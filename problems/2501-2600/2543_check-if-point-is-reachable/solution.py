from typing import List, Optional


class Solution:
    def isReachable(self, targetX: int, targetY: int) -> bool:
        # Reachability invariant: subtractive moves preserve gcd(x, y)
        # exactly and doubling moves scale it by a factor of 2, so along
        # any path from (1, 1) the ODD part of the gcd never changes --
        # and it starts at 1. Hence a reachable point's gcd must be a
        # power of two. The converse is constructive in reverse (Euclid
        # with halvings), so the test is simply gcd == 2^k, checked with
        # the classic g & (g - 1) == 0 trick. Coordinates are <= 10^9,
        # so every intermediate fits comfortably in machine words.
        x, y = targetX, targetY
        while y:
            x, y = y, x % y
        return x & (x - 1) == 0
