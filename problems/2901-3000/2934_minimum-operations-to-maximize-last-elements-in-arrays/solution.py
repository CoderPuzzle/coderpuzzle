from typing import List


class Solution:
    def minOperations(self, nums1: List[int], nums2: List[int]) -> int:
        # Two fates for the last column: untouched, or swapped once (which
        # exchanges the two targets). For fixed targets every earlier index
        # is independent: keep the pair if it already fits, else swap it if
        # it fits crossed, else the fate is dead.
        def cost(keep_last: bool) -> int:
            n = len(nums1)
            if keep_last:
                top1, top2 = nums1[n - 1], nums2[n - 1]
            else:
                top1, top2 = nums2[n - 1], nums1[n - 1]
            ops = 0 if keep_last else 1
            for i in range(n - 1):
                a, b = nums1[i], nums2[i]
                if a <= top1 and b <= top2:
                    continue
                if b <= top1 and a <= top2:
                    ops += 1
                else:
                    return -1
            return ops

        both = [cost(True), cost(False)]
        if both[0] == -1 and both[1] == -1:
            return -1
        feasible = [c for c in both if c != -1]
        return min(feasible)
