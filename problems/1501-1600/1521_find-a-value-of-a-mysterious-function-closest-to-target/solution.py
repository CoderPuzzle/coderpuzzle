from typing import List, Optional


class Solution:
    def closestToTarget(self, arr: List[int], target: int) -> int:
        # prev holds the distinct AND-values of every subarray ending at the
        # previous index. AND only clears bits, so this set stays small
        # (O(log(max(arr))) entries) and updates cheaply from one index to
        # the next.
        best = abs(arr[0] - target)
        prev = {arr[0]}
        for value in arr[1:]:
            cur = {value}
            for p in prev:
                cur.add(p & value)
            for v in cur:
                diff = abs(v - target)
                if diff < best:
                    best = diff
            prev = cur
        return best
