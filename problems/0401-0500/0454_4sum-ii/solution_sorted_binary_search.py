from bisect import bisect_left, bisect_right


class Solution:
    def fourSumCount(self, nums1: list[int], nums2: list[int], nums3: list[int], nums4: list[int]) -> int:
        # Same split as the hash-map version -- a+b+c+d = 0 iff a+b = -(c+d)
        # -- but the join is ordered ground rather than a table: materialise
        # both halves' pair sums and sort the right one.
        left = [a + b for a in nums1 for b in nums2]
        right = [c + d for c in nums3 for d in nums4]
        right.sort()
        total = 0
        # Each left sum asks "how many right sums equal my negation?"; on a
        # sorted array a pair of binary searches brackets exactly that run.
        for sum_ in left:
            negated = -sum_
            total += bisect_right(right, negated) - bisect_left(right, negated)
        return total
