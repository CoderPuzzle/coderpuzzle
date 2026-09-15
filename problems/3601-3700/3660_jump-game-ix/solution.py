from typing import List


class Solution:
    def maxValue(self, nums: List[int]) -> List[int]:
        # suf[i]: smallest value in nums[i..n-1]; +infinity past the end so
        # the last index always closes its segment.
        n = len(nums)
        suf = [0] * (n + 1)
        suf[n] = float("inf")
        for i in range(n - 1, -1, -1):
            suf[i] = min(suf[i + 1], nums[i])
        # Grow the current segment while its prefix maximum strictly exceeds
        # the suffix minimum just past it: any such boundary is crossed by an
        # inverted pair, so the component cannot end there.
        ans: List[int] = []
        seg_max = 0
        run = 0
        for i, value in enumerate(nums):
            seg_max = max(seg_max, value)
            run += 1
            if i == n - 1 or seg_max <= suf[i + 1]:
                # The segment is closed: every index inside it reaches the
                # segment maximum and nothing beyond it.
                ans.extend([seg_max] * run)
                seg_max = 0
                run = 0
        return ans
