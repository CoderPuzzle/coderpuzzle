from typing import List, Optional
from collections import deque


class Solution:
    def shortestSubarray(self, nums: List[int], k: int) -> int:
        n = len(nums)
        # Negatives break the sliding-window trick, so reason in
        # prefix sums: a subarray sum is prefix[i] - prefix[j], and
        # the sentinel prefix[0] = 0 lets subarrays starting at 0
        # compete.
        prefix = [0] * (n + 1)
        for i, x in enumerate(nums):
            prefix[i + 1] = prefix[i] + x
        # Deque of start indices whose prefix sums strictly increase
        # front to back.
        dq = deque()
        best = n + 1
        for i, p in enumerate(prefix):
            # Consume qualifying fronts: each offers length i - front,
            # and popping is safe because later ends only lengthen the
            # same start.
            while dq and prefix[dq[0]] <= p - k:
                best = min(best, i - dq.popleft())
            # A later index with an equal-or-smaller prefix dominates
            # as a future start, so trim the tail.
            while dq and prefix[dq[-1]] >= p:
                dq.pop()
            dq.append(i)
        return best if best <= n else -1
