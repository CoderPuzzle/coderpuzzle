from typing import List, Optional


class Fenwick:
    """Fenwick tree over 1-indexed positions, API is 0-indexed."""

    def __init__(self, n):
        self.n = n
        self.bit = [0] * (n + 1)

    def add(self, i, delta):
        i += 1
        while i <= self.n:
            self.bit[i] += delta
            i += i & (-i)

    def prefix(self, i):
        i += 1
        total = 0
        while i > 0:
            total += self.bit[i]
            i -= i & (-i)
        return total

    def range_sum(self, l, r):
        if l > r:
            return 0
        return self.prefix(r) - self.prefix(l - 1)


class Solution:
    def countOfPeaks(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        n = len(nums)

        def is_peak(i):
            return 0 < i < n - 1 and nums[i] > nums[i - 1] and nums[i] > nums[i + 1]

        bit = Fenwick(n)
        for i in range(n):
            if is_peak(i):
                bit.add(i, 1)

        answer = []
        for q in queries:
            if q[0] == 1:
                l, r = q[1], q[2]
                answer.append(0 if r - l < 2 else bit.range_sum(l + 1, r - 1))
            else:
                idx, val = q[1], q[2]
                affected = [j for j in (idx - 1, idx, idx + 1) if 0 <= j < n]
                for j in affected:
                    if is_peak(j):
                        bit.add(j, -1)
                nums[idx] = val
                for j in affected:
                    if is_peak(j):
                        bit.add(j, 1)
        return answer
