from typing import List


class Solution:
    def resultArray(self, nums: List[int], k: int, queries: List[List[int]]) -> List[int]:
        # After the update and the forced prefix removal, the operation picks
        # nums[start..j], so a query counts j >= start whose product from
        # start is x mod k. Each segment tree node stores the counts of its
        # segment's prefix products plus the segment product; merging
        # prepends the left product to the right child's counts, and the
        # suffix query merges the decomposition of nums[start..] left to
        # right while carrying the running product. Every stored value is
        # below k <= 5 and every count below n, so ints never overflow.
        n = len(nums)
        size = 1
        while size < n:
            size <<= 1

        def merge(u):
            base = u * k
            lrow = 2 * u * k
            rrow = lrow + k
            cnt[base : base + k] = cnt[lrow : lrow + k]
            lp = prod[u + u]
            for p in range(k):
                c = cnt[rrow + p]
                if c:
                    cnt[base + lp * p % k] += c
            prod[u] = lp * prod[u + u + 1] % k

        cnt = [0] * (2 * size * k)
        prod = [1] * (2 * size)
        for i, v in enumerate(nums):
            prod[size + i] = v % k
            cnt[(size + i) * k + v % k] = 1
        for u in range(size - 1, 0, -1):
            merge(u)
        result = []
        for index, value, start, x in queries:
            leaf = size + index
            row = leaf * k
            for r in range(k):
                cnt[row + r] = 0
            cnt[row + value % k] = 1
            prod[leaf] = value % k
            u = leaf >> 1
            while u:
                merge(u)
                u >>= 1
            lo, hi = size + start, 2 * size
            cur = [0] * k
            running = 1
            while lo < hi:
                if lo & 1:
                    base = lo * k
                    for p in range(k):
                        c = cnt[base + p]
                        if c:
                            cur[running * p % k] += c
                    running = running * prod[lo] % k
                    lo += 1
                lo >>= 1
                hi >>= 1
            result.append(cur[x])
        return result
