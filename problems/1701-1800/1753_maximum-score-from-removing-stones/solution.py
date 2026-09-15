from typing import List, Optional


class Solution:
    def maximumScore(self, a: int, b: int, c: int) -> int:
        # With x <= y <= z the answer is min(x + y, total / 2): the
        # smaller piles limit how often the big one can be paired, and
        # each move spends exactly two stones.
        x, y, z = sorted((a, b, c))
        return x + y if x + y <= z else (x + y + z) // 2
