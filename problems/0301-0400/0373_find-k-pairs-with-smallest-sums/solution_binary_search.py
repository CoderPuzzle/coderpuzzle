from bisect import bisect_left


class Solution:
    def kSmallestPairs(self, nums1: list[int], nums2: list[int], k: int) -> list[list[int]]:
        # How many pairs sum to at most s? Both arrays are sorted, so a
        # descending pointer into nums2 serves every nums1[i]: the bound
        # s - nums1[i] only falls as i rises, so the pointer never turns
        # back.
        def count_at_most(s: int) -> int:
            total = 0
            j = len(nums2) - 1
            for a in nums1:
                bound = s - a
                while j >= 0 and nums2[j] > bound:
                    j -= 1
                total += j + 1
            return total

        # The k-th smallest sum is the least s with count_at_most(s) >= k.
        lo = nums1[0] + nums2[0]
        hi = nums1[-1] + nums2[-1]
        while lo < hi:
            mid = (lo + hi) // 2
            if count_at_most(mid) >= k:
                hi = mid
            else:
                lo = mid + 1
        threshold = lo

        # Every pair strictly below the threshold makes the cut — there are
        # fewer than k of them by the minimality of the threshold.
        below = []
        j = len(nums2) - 1
        for i, a in enumerate(nums1):
            while j >= 0 and a + nums2[j] >= threshold:
                j -= 1
            for jj in range(j + 1):
                below.append((a + nums2[jj], i, jj))
        below.sort()

        result = [[nums1[i], nums2[j]] for _, i, j in below]
        # Top up with pairs exactly at the threshold, in (i, j) order —
        # the required tie-break among equal sums.
        needed = k - len(result)
        for i, a in enumerate(nums1):
            if needed == 0:
                break
            target = threshold - a
            lo_j = bisect_left(nums2, target)
            hi_j = bisect_left(nums2, target + 1)
            for jj in range(lo_j, min(hi_j, lo_j + needed)):
                result.append([a, nums2[jj]])
                needed -= 1
        return result
