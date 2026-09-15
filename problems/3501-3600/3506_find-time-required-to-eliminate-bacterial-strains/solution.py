from typing import List


class Solution:
    def minEliminationTime(self, timeReq: List[int], splitTime: int) -> int:
        # The splitting process is a full binary tree: a leaf at depth d is a
        # WBC that starts working at d * splitTime. Deadline T is reachable
        # iff strain i can sit on a leaf of depth d <= (T - timeReq[i]) //
        # splitTime, and legal leaf-depth multisets are exactly the
        # Kraft-legal ones (sum 2^-d <= 1) -- minimized by taking every
        # strain at its full depth bound. Binary search the minimal T.
        n = len(timeReq)
        lo = max(timeReq) + splitTime
        hi = max(timeReq) + (n - 1) * splitTime

        def feasible(deadline: int) -> bool:
            slots = 0
            deep = 0
            for t in timeReq:
                d = (deadline - t) // splitTime
                if d < 1:
                    return False
                if d > 30:
                    # bounds past depth 30 fit together in less than one
                    # 2^-30 unit of slack (n < 2^17 strains), so count all
                    # of them as a single unit
                    deep = 1
                else:
                    slots += 1 << (30 - d)
                    if slots > 1 << 30:
                        return False
            return slots + deep <= 1 << 30

        while lo < hi:
            mid = (lo + hi) // 2
            if feasible(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
