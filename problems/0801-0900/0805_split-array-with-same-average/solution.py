from typing import List, Optional


class Solution:
    def splitArraySameAverage(self, nums: List[int]) -> bool:
        n = len(nums)
        total = sum(nums)

        # Enumerate each half separately (at most 2^(n/2) subsets) and
        # group achievable sums by subset size.
        def subset_sums(arr):
            d = {}
            m = len(arr)
            for mask in range(1 << m):
                s = 0
                sz = 0
                for i in range(m):
                    if mask >> i & 1:
                        s += arr[i]
                        sz += 1
                d.setdefault(sz, set()).add(s)
            return d

        mid = n // 2
        left = subset_sums(nums[:mid])
        right = subset_sums(nums[mid:])
        nr = n - mid

        # Equal averages force both parts to the whole-array average
        # total/n, so seek a proper subset of size s summing to
        # total*s/n; only sizes with an integer target can work, and
        # s in 1..n-1 keeps both parts non-empty.
        for s in range(1, n):
            if (total * s) % n != 0:
                continue
            target = total * s // n
            # Clamp s1 so both pieces actually fit in their halves.
            lo = max(0, s - nr)
            hi = min(mid, s)
            for s1 in range(lo, hi + 1):
                s2 = s - s1
                if s1 not in left or s2 not in right:
                    continue
                # Assemble: a left sum v plus a right sum target - v
                # builds a valid subset (only sums, not identities).
                for v in left[s1]:
                    if (target - v) in right[s2]:
                        return True
        return False
