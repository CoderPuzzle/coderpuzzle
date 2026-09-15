class Solution:
    def minimumTime(self, nums1: List[int], nums2: List[int], x: int) -> int:
        # Exchange arguments: each index needs zeroing at most once ("shift
        # left" removes repeats), and among the kept zeroings larger rates
        # belong later - taking element e as operation j removes
        # nums1[e] + nums2[e] * j of the eventual sum. Sort ascending by rate.
        order = sorted(range(len(nums1)), key=lambda i: nums2[i])
        base = sum(nums1)
        growth = sum(nums2)
        # Best[j] = the most removable using exactly j operations among the
        # elements processed so far; every value here stays below ~1.1 * 10^9.
        best = [0] * (len(order) + 1)
        for position, index in enumerate(order, start=1):
            initial = nums1[index]
            rate = nums2[index]
            for count in range(position, 0, -1):
                best[count] = max(best[count], best[count - 1] + initial + rate * count)
        for time in range(len(order) + 1):
            if base + growth * time - best[time] <= x:
                return time
        return -1
