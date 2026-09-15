class Solution:
    def search(self, reader: ArrayReader, target: int) -> int:
        # Exponential probe: find the smallest power-of-two index whose
        # value reaches the target (or the out-of-range sentinel, which is
        # larger than any real element).
        hi = 1
        while reader.get(hi) < target:
            hi *= 2
        # Ordinary binary search for the first index with value >= target.
        lo = 0
        while lo < hi:
            mid = (lo + hi) // 2
            if reader.get(mid) < target:
                lo = mid + 1
            else:
                hi = mid
        return lo if reader.get(lo) == target else -1
