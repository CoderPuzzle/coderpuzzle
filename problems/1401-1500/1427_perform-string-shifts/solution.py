from typing import List


class Solution:
    def stringShift(self, s: str, shift: List[List[int]]) -> str:
        net = 0
        for direction, amount in shift:
            net += amount if direction == 0 else -amount
        n = len(s)
        k = net % n  # positive k = net left shift
        return s[k:] + s[:k]
