from typing import List


class Solution:
    def minOperations(self, nums1: List[int], nums2: List[int]) -> int:
        # Reachable sums are [n, 6n] per array, so equality is impossible
        # exactly when those ranges are disjoint. Otherwise tally each
        # operation's best gain (v-1 for elements of the larger-sum array,
        # 6-v for the smaller) and spend the largest gains first.
        if len(nums1) > 6 * len(nums2) or len(nums2) > 6 * len(nums1):
            return -1
        sum1, sum2 = sum(nums1), sum(nums2)
        if sum1 == sum2:
            return 0
        big, small = (nums1, nums2) if sum1 > sum2 else (nums2, nums1)
        gap = abs(sum1 - sum2)
        gains = [0] * 6
        for v in big:
            gains[v - 1] += 1
        for v in small:
            gains[6 - v] += 1
        ops = 0
        for g in range(5, 0, -1):
            take = min(gains[g], (gap + g - 1) // g)
            ops += take
            gap -= take * g
            if gap <= 0:
                break
        return ops
