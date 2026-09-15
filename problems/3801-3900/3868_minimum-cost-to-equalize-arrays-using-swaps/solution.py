from collections import Counter
from typing import List


class Solution:
    def minCost(self, nums1: List[int], nums2: List[int]) -> int:
        # Within-array swaps are free, so only the frequency of each value in
        # each array matters. Both arrays must end with the same multiset:
        # value v appears (cnt1[v] + cnt2[v]) / 2 times in each, which is
        # possible only when that combined count is even.
        cnt1 = Counter(nums1)
        cnt2 = Counter(nums2)
        total_diff = 0
        for v in set(cnt1) | set(cnt2):
            a = cnt1.get(v, 0)
            b = cnt2.get(v, 0)
            if (a + b) % 2 == 1:
                return -1
            total_diff += abs(a - b)
        # Each cross swap moves one surplus element out of nums1 and one out
        # of nums2, fixing two placements at once. The surplus in nums1 is
        # half the positive differences, which is a quarter of the sum of all
        # differences because the two arrays are equally large.
        return total_diff // 4
