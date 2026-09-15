from collections import deque
from typing import List


class Solution:
    def minJumps(self, nums: List[int]) -> int:
        # BFS over indices. When a prime-valued index p is first settled,
        # every index whose value is divisible by p joins the next BFS
        # layer, so the bucket of p is cleared after that single use — any
        # later prime-p index is strictly farther. Buckets are built
        # lazily by walking multiples of p up to max(nums) through a
        # value -> indices table.
        n = len(nums)
        if n == 1:
            return 0
        limit = max(nums)
        is_prime = bytearray([1]) * (limit + 1)
        is_prime[0] = 0
        if limit >= 1:
            is_prime[1] = 0
        f = 2
        while f * f <= limit:
            if is_prime[f]:
                is_prime[f * f :: f] = bytearray(len(range(f * f, limit + 1, f)))
            f += 1
        by_value = {}
        for i, v in enumerate(nums):
            by_value.setdefault(v, []).append(i)
        dist = [-1] * n
        dist[0] = 0
        queue = deque([0])
        used = set()
        while queue:
            i = queue.popleft()
            d = dist[i] + 1
            for j in (i - 1, i + 1):
                if 0 <= j < n and dist[j] == -1:
                    dist[j] = d
                    queue.append(j)
            p = nums[i]
            if p > 1 and is_prime[p] and p not in used:
                used.add(p)
                bucket = []
                for m in range(p, limit + 1, p):
                    bucket.extend(by_value.get(m, ()))
                for j in bucket:
                    if dist[j] == -1:
                        dist[j] = d
                        queue.append(j)
        return dist[n - 1]
