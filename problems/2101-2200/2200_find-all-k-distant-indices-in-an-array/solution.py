class Solution:
    def findKDistantIndices(self, nums: list[int], key: int, k: int) -> list[int]:
        out: list[int] = []
        next_free = 0
        n = len(nums)
        # each key occurrence contributes the window [j-k, j+k]; windows
        # are naturally ordered, so clip against what's already emitted
        # instead of deduplicating through a set
        for j in range(n):
            if nums[j] != key:
                continue
            lo = max(next_free, j - k)
            hi = min(n - 1, j + k)
            out.extend(range(lo, hi + 1))
            next_free = hi + 1
        return out
