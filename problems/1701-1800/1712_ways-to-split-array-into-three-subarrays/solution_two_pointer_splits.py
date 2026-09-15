class Solution:
    def waysToSplit(self, nums: list[int]) -> int:
        MOD = 10**9 + 7
        n = len(nums)
        prefix = [0] * (n + 1)
        for i, value in enumerate(nums):
            prefix[i + 1] = prefix[i] + value
        total = prefix[n]
        answer = 0
        # Both cut bounds move monotonically with the first cut, so two
        # pointers that only ever advance replace the repeated searches.
        lo = 2
        hi = 2
        for i in range(1, n - 1):
            left = prefix[i]
            if lo < i + 1:
                lo = i + 1
            # left <= mid becomes prefix[j] >= 2 * left: skip the entries
            # that leave the middle block too small.
            while lo < n and prefix[lo] < 2 * left:
                lo += 1
            if lo >= n:
                continue
            # mid <= right becomes prefix[j] <= (total + left) // 2 — the
            # floor is exact because the bound is an integer inequality.
            if hi < lo:
                hi = lo
            while hi < n and prefix[hi] <= (total + left) // 2:
                hi += 1
            if hi > lo:
                answer = (answer + hi - lo) % MOD
        return answer
