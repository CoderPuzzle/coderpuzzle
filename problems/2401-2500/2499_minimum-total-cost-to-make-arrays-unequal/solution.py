from typing import List


class Solution:
    def minimumTotalCost(self, nums1: List[int], nums2: List[int]) -> int:
        # Every equal column nums1[i] == nums2[i] must take part in some
        # swap, so pay them all tentatively and histogram their values.
        # If one value strictly dominates, buy the cheapest remaining
        # columns that are unequal on both sides and carry neither value,
        # in a single ascending pass, until dominance breaks; running out
        # of columns means no swap plan can exist.
        cost = 0
        cnt = {}
        chosen = 0
        dom = None
        for i, (x, y) in enumerate(zip(nums1, nums2)):
            if x == y:
                cnt[x] = cnt.get(x, 0) + 1
                if dom is None or cnt[x] > cnt[dom]:
                    dom = x
                chosen += 1
                cost += i
        if chosen == 0:
            return 0
        for j in range(len(nums1)):
            if cnt[dom] * 2 <= chosen:
                break
            if nums1[j] != nums2[j] and nums1[j] != dom and nums2[j] != dom:
                chosen += 1
                cost += j
        return cost if cnt[dom] * 2 <= chosen else -1
