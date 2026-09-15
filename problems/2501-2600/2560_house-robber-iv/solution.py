from typing import List


class Solution:
    def minCapability(self, nums: List[int], k: int) -> int:
        def feasible(cap: int) -> bool:
            # Greedy scan: take every house that fits under the cap and skip
            # its neighbor. Taking an eligible house is never worse than
            # skipping it — skipping forfeits a pick without unlocking a
            # better one — so this counts the maximum non-adjacent picks.
            count = 0
            i = 0
            while i < len(nums):
                if nums[i] <= cap:
                    count += 1
                    i += 2
                else:
                    i += 1
            return count >= k

        # "k non-adjacent houses all <= cap" is monotone in cap, so binary
        # search the smallest feasible cap over the value range [min, max] —
        # raw values, so nums needs no sorting. Lower-mid since we minimize.
        lo, hi = min(nums), max(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if feasible(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
