from typing import List


class Solution:
    def minLargest(self, nums1: List[int], nums2: List[int]) -> int:
        # Read in increasing order, any replacement becomes a merge of the
        # two arrays; replaying a merge hands each slot the smallest value
        # above its predecessor with the slot's parity, so a step adds 1
        # when the bit differs from the previous bit and 2 when it repeats.
        # dp[i][j][f] is the replay minimum after consuming i slots of
        # nums1 and j of nums2 with the last value taken by array f; two
        # rolling rows carry the table.
        BIG = 1 << 29
        n, m = len(nums1), len(nums2)
        prv0 = [BIG] * (m + 1)
        prv1 = [BIG] * (m + 1)
        if m >= 1:
            prv1[1] = 2 - nums2[0]
            for j in range(2, m + 1):
                prv1[j] = prv1[j - 1] + (1 if nums2[j - 2] != nums2[j - 1] else 2)
        for i in range(1, n + 1):
            x = nums1[i - 1]
            step_x = 1 if i >= 2 and nums1[i - 2] != x else 2
            cur0 = [BIG] * (m + 1)
            cur1 = [BIG] * (m + 1)
            cur0[0] = 2 - x if i == 1 else prv0[0] + step_x
            for j in range(1, m + 1):
                y = nums2[j - 1]
                cur0[j] = min(prv0[j] + step_x, prv1[j] + (1 if y != x else 2))
                best = cur0[j - 1] + (1 if x != y else 2)
                if j >= 2:
                    cand = cur1[j - 1] + (1 if nums2[j - 2] != y else 2)
                    if cand < best:
                        best = cand
                cur1[j] = best
            prv0, prv1 = cur0, cur1
        return min(prv0[m], prv1[m])
