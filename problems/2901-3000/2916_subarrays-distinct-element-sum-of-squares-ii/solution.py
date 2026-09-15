from typing import List


class Solution:
    def sumCounts(self, nums: List[int]) -> int:
        # Fenwick pair over the per-start distinct counts d[j] of the windows
        # ending at the current index: b1/b2 give range-add and range-sum of
        # exact counts. Range sums reach n(n+1)/2 ~ 5*10^9, past 32 bits, so
        # every accumulator stays wide (Python ints are arbitrary precision).
        MOD = 1_000_000_007
        n = len(nums)
        b1 = [0] * (n + 2)
        b2 = [0] * (n + 2)

        def add(l, r, v):
            x = l
            while x <= n + 1:
                b1[x] += v
                b2[x] += v * (l - 1)
                x += x & -x
            x = r + 1
            while x <= n + 1:
                b1[x] -= v
                b2[x] -= v * r
                x += x & -x

        def prefix(x):
            x0 = x
            s1 = s2 = 0
            while x > 0:
                s1 += b1[x]
                s2 += b2[x]
                x -= x & -x
            return s1 * x0 - s2

        answer = 0
        running = 0  # Q_i: sum of d^2 over the windows ending at i
        last_seen = {}
        for i, num in enumerate(nums):
            lo = last_seen.get(num, -1) + 2
            # Windows opened in (last, i-1] each gain one distinct value, so
            # their squares grow by 2*d + 1; the fresh window contributes
            # 1^2. T is the exact pre-increment sum over the gaining range.
            t = prefix(i) - prefix(lo - 1)
            running = (running + 2 * t + (i - lo + 2)) % MOD
            answer = (answer + running) % MOD
            if lo <= i:
                add(lo, i, 1)
            add(i + 1, i + 1, 1)
            last_seen[num] = i
        return answer
