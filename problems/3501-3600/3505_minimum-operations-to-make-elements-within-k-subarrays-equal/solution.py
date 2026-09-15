from typing import List, Optional


class Solution:
    def minOperations(self, nums: List[int], x: int, k: int) -> int:
        # Equalizing a window costs sum(|v - t|), minimized when t is a
        # median. A sliding window over a Fenwick tree (compressed values)
        # yields every x-window's cost in O(log n): kth finds the median and
        # prefix count/sum split the window about it. A rolling DP then picks
        # k non-overlapping windows.
        vals = sorted(set(nums))
        m = len(vals)
        comp = {v: i + 1 for i, v in enumerate(vals)}

        cnt = [0] * (m + 1)
        sm = [0] * (m + 1)

        def add(i, c, s):
            while i <= m:
                cnt[i] += c
                sm[i] += s
                i += i & -i

        def prefix(i):
            c = s = 0
            while i:
                c += cnt[i]
                s += sm[i]
                i -= i & -i
            return c, s

        def kth(kpos):
            pos = 0
            acc = 0
            step = 1
            while step << 1 <= m:
                step <<= 1
            while step:
                nxt = pos + step
                if nxt <= m and acc + cnt[nxt] < kpos:
                    pos = nxt
                    acc += cnt[nxt]
                step >>= 1
            return pos + 1

        n = len(nums)
        nwin = n - x + 1
        costs = [0] * nwin
        total = 0
        for i, v in enumerate(nums):
            add(comp[v], 1, v)
            total += v
            if i >= x:
                old = nums[i - x]
                add(comp[old], -1, -old)
                total -= old
            if i >= x - 1:
                mid = kth((x + 1) // 2)
                c, s = prefix(mid)
                med = vals[mid - 1]
                costs[i - x + 1] = med * c - s + (total - s) - med * (x - c)

        INF = float("inf")
        prev = [0] * nwin  # t = 0 windows: cost 0 everywhere
        for t in range(1, k + 1):
            cur = [INF] * nwin
            for i in range(nwin):
                best = cur[i - 1] if i else INF
                if t == 1:
                    if costs[i] < best:
                        best = costs[i]
                elif i >= x:
                    take = costs[i] + prev[i - x]
                    if take < best:
                        best = take
                cur[i] = best
            prev = cur
        return prev[-1]
