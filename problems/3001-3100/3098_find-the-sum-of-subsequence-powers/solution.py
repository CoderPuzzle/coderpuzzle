from typing import List, Optional

MOD = 10**9 + 7


class Solution:
    def sumOfPowers(self, nums: List[int], k: int) -> int:
        nums = sorted(nums)
        n = len(nums)
        diffs = sorted({nums[j] - nums[i] for i in range(n) for j in range(i + 1, n)})

        def count_at_least(d):
            # number of length-k subsequences with all adjacent gaps >= d
            splits = []
            for j in range(n):
                # bisect_right(nums, nums[j] - d, 0, j)
                target = nums[j] - d
                lo, hi = 0, j
                while lo < hi:
                    mid = (lo + hi) // 2
                    if nums[mid] <= target:
                        lo = mid + 1
                    else:
                        hi = mid
                splits.append(lo)
            prev = [1] * n  # length 1 subsequences
            for _length in range(2, k + 1):
                pref = [0] * (n + 1)
                acc = 0
                for i in range(n):
                    pref[i] = acc
                    acc += prev[i]
                pref[n] = acc
                if acc == 0:
                    return 0
                prev = [pref[sp] % MOD for sp in splits]
            return sum(prev) % MOD

        ans = 0
        prev_f = 0
        for d in reversed(diffs):
            f = count_at_least(d)
            g = (f - prev_f) % MOD  # subsequences whose min-diff is exactly d
            ans = (ans + d * g) % MOD
            prev_f = f
        return ans
