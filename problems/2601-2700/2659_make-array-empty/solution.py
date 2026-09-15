from typing import List, Optional


class Solution:
    def countOperationsToEmptyArray(self, nums: List[int]) -> int:
        n = len(nums)
        if n == 0:
            return 0

        tree = [0] * (n + 1)

        def add(i, delta):
            while i <= n:
                tree[i] += delta
                i += i & -i

        def prefix(i):
            s = 0
            while i > 0:
                s += tree[i]
                i -= i & -i
            return s

        def kth(k):
            # smallest index with prefix(index) >= k
            idx = 0
            bit = 1 << (n.bit_length() - 1)
            while bit:
                nxt = idx + bit
                if nxt <= n and tree[nxt] < k:
                    idx = nxt
                    k -= tree[nxt]
                bit >>= 1
            return idx + 1

        for i in range(1, n + 1):
            add(i, 1)

        order = sorted(range(n), key=lambda i: nums[i])
        ops = 0
        cur = 1
        removed = 0
        for idx in order:
            pos = idx + 1
            if pos >= cur:
                ops += prefix(pos) - prefix(cur - 1)
            else:
                ops += prefix(n) - prefix(cur - 1) + prefix(pos)
            add(pos, -1)
            removed += 1
            remaining = n - removed
            if remaining > 0:
                rank_after = prefix(pos)
                next_rank = (rank_after % remaining) + 1
                cur = kth(next_rank)
        return ops
