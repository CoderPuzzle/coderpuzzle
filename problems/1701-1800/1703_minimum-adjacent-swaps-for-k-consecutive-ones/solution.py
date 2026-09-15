from typing import List, Optional


class Solution:
    def minMoves(self, nums: List[int], k: int) -> int:
        if k <= 1:
            return 0
        pos = [i for i, v in enumerate(nums) if v == 1]
        m = len(pos)
        # q[i] = pos[i] - i shifts the i-th one left past the ones before it,
        # so in q-space every one costs exactly one swap per position moved.
        q = [pos[i] - i for i in range(m)]
        pref = [0] * (m + 1)
        for i in range(m):
            pref[i + 1] = pref[i] + q[i]
        best = float("inf")
        # The optimal group of k ones is consecutive in pos; gather each
        # window on the median of its q values, which minimizes the total
        # L1 distance.
        for i in range(m - k + 1):
            mid = i + k // 2
            # Left half pulled onto the median, right half symmetrically,
            # both in O(1) via the prefix sums.
            left = q[mid] * (mid - i) - (pref[mid] - pref[i])
            right = (pref[i + k] - pref[mid + 1]) - q[mid] * (i + k - 1 - mid)
            cost = left + right
            if cost < best:
                best = cost
        return best
