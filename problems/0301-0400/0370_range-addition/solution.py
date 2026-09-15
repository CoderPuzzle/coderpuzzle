from typing import List, Optional


class Solution:
    def getModifiedArray(self, length: int, updates: List[List[int]]) -> List[int]:
        # Record only where the running total changes: +inc at start,
        # -inc just past end. The extra slot makes end+1 safe at the
        # last index.
        diff = [0] * (length + 1)
        for start, end, inc in updates:
            diff[start] += inc
            diff[end + 1] -= inc
        arr = []
        cur = 0
        # One prefix-sum sweep: position i sees exactly the updates whose
        # ranges still cover it.
        for i in range(length):
            cur += diff[i]
            arr.append(cur)
        return arr
