from typing import List, Optional


class Solution:
    def countRangeSum(self, nums: List[int], lower: int, upper: int) -> int:
        n = len(nums)
        # Range sums become pairs: count i < j with
        # prefix[j] - prefix[i] in [lower, upper] (leading 0 included).
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + nums[i]

        def merge_count(lo, hi):
            if lo >= hi:
                return 0
            mid = (lo + hi) // 2
            # Pairs inside each half first; cross pairs next.
            count = merge_count(lo, mid) + merge_count(mid + 1, hi)

            # Left half is sorted, so for each left prefix the valid right
            # entries form the window [l, r): l skips below-lower, r passes
            # at-most-upper; both pointers only ever move forward.
            l = mid + 1
            r = mid + 1
            for i in range(lo, mid + 1):
                while l <= hi and prefix[l] - prefix[i] < lower:
                    l += 1
                while r <= hi and prefix[r] - prefix[i] <= upper:
                    r += 1
                count += r - l

            # Standard merge re-sorts the range, restoring the invariant
            # the parent level relies on.
            left = prefix[lo : mid + 1]
            right = prefix[mid + 1 : hi + 1]
            merged = []
            i = j = 0
            while i < len(left) and j < len(right):
                if left[i] <= right[j]:
                    merged.append(left[i])
                    i += 1
                else:
                    merged.append(right[j])
                    j += 1
            merged.extend(left[i:])
            merged.extend(right[j:])
            prefix[lo : hi + 1] = merged
            return count

        return merge_count(0, n)
