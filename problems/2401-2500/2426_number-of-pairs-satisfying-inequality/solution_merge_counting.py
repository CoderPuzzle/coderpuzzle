class Solution:
    def numberOfPairs(self, nums1: list[int], nums2: list[int], diff: int) -> int:
        values = [x - y for x, y in zip(nums1, nums2)]

        def merge_sort(lo, hi):
            """Sort values[lo:hi], returning the cross pairs values[i] <= values[j] + diff."""
            if hi - lo < 2:
                return 0
            mid = (lo + hi) // 2
            count = merge_sort(lo, mid) + merge_sort(mid, hi)
            left = values[lo:mid]
            p = 0  # left values at or below the running bound
            for j in range(mid, hi):
                while p < len(left) and left[p] <= values[j] + diff:
                    p += 1
                count += p  # each admitted left value pairs with this right element
            i, j, k = 0, mid, lo
            while i < len(left) and j < hi:
                if left[i] <= values[j]:  # equal: the left element places first
                    values[k] = left[i]
                    i += 1
                else:
                    values[k] = values[j]
                    j += 1
                k += 1
            while i < len(left):
                values[k] = left[i]
                i += 1
                k += 1
            return count

        return merge_sort(0, len(values))
