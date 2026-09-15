from typing import List


class Solution:
    def earliestSecondToMarkIndices(self, nums: List[int], changeIndices: List[int]) -> int:
        n = len(nums)

        def can_mark(t: int) -> bool:
            last = [0] * n
            for s in range(1, t + 1):
                last[changeIndices[s - 1] - 1] = s
            need = 0
            marked = 0
            for s in range(1, t + 1):
                i = changeIndices[s - 1] - 1
                if last[i] == s:
                    need += nums[i]
                    marked += 1
                    if need > s - marked:
                        return False
            return marked == n

        lo, hi = 1, len(changeIndices)
        while lo < hi:
            mid = (lo + hi) // 2
            if can_mark(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo if can_mark(lo) else -1
