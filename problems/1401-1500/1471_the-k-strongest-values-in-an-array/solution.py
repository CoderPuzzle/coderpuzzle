from typing import List


class Solution:
    def getStrongest(self, arr: List[int], k: int) -> List[int]:
        ordered = sorted(arr)
        m = ordered[(len(arr) - 1) // 2]
        ranked = sorted(arr, key=lambda v: (-abs(v - m), -v))
        return ranked[:k]
