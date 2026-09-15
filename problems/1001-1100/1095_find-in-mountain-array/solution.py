class Solution:
    def findInMountainArray(self, mountainArr: MountainArray, target: int) -> int:
        n = mountainArr.length()

        # Peak: the last index still on the rising slope — get(mid - 1) <
        # get(mid) means mid has not passed the peak yet.
        lo, hi = 1, n - 2
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if mountainArr.get(mid - 1) < mountainArr.get(mid):
                lo = mid
            else:
                hi = mid - 1
        peak = lo

        # Ascending slope: smallest index with value >= target.
        lo, hi = 0, peak
        while lo < hi:
            mid = (lo + hi) // 2
            if mountainArr.get(mid) < target:
                lo = mid + 1
            else:
                hi = mid
        if mountainArr.get(lo) == target:
            return lo

        # Descending slope: smallest index with value <= target.
        lo, hi = peak, n - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if mountainArr.get(mid) > target:
                lo = mid + 1
            else:
                hi = mid
        if mountainArr.get(lo) == target:
            return lo
        return -1
