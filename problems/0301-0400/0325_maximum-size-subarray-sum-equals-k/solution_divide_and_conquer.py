class Solution:
    def maxSubArrayLen(self, nums: list[int], k: int) -> int:
        # Longest qualifying subarray inside nums[lo..hi]: recurse on each
        # half, then stitch the halves together.
        def solve(lo: int, hi: int) -> int:
            if lo > hi:
                return 0
            if lo == hi:
                return 1 if nums[lo] == k else 0
            mid = (lo + hi) // 2
            best = max(solve(lo, mid), solve(mid + 1, hi))
            # A subarray crossing the midline is a suffix of the left half
            # plus a prefix of the right half. Record, per suffix sum, the
            # longest suffix that carries it — scanning away from the mid
            # and overwriting keeps the longest.
            longest = {}
            total = 0
            for i in range(mid, lo - 1, -1):
                total += nums[i]
                longest[total] = mid - i + 1
            total = 0
            for j in range(mid + 1, hi + 1):
                total += nums[j]
                # The right prefix pins the sum the left suffix must supply.
                need = k - total
                if need in longest:
                    length = longest[need] + (j - mid)
                    if length > best:
                        best = length
            return best

        return solve(0, len(nums) - 1)
