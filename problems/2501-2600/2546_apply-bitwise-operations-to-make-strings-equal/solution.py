from typing import List, Optional


class Solution:
    def makeStringsEqual(self, s: str, target: str) -> bool:
        # The operation maps (0,0)->(0,0), (0,1)/(1,0)->(1,1), and
        # (1,1)->(1,0): an all-zero string is frozen forever, and once a
        # 1 exists it can never be the last one destroyed — zeroing a
        # cell consumes two ones and leaves a third value of 1 behind.
        # So "contains a 1" is invariant in both directions, and any two
        # strings that agree on it are mutually reachable.
        return ("1" in s) == ("1" in target)
