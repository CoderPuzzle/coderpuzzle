from typing import List


class Solution:
    def popcountDepth(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        # Every popcount chain collapses to 1 in at most four steps for
        # values <= 10^15, so depths live in 0..4 (k may still ask for 5,
        # whose tree simply stays empty). Six Fenwick trees, one per depth
        # class, each marking the indices currently holding that depth: a
        # query is a prefix-difference on tree[k], an update is two point
        # flips. All loops are iterative, and every count is <= n, so
        # 32-bit answers are safe while values ride in 64-bit.
        n = len(nums)
        trees = [[0] * (n + 1) for _ in range(6)]

        def depth(x):
            d = 0
            while x > 1:
                x = x.bit_count()
                d += 1
            return d

        def add(k, i, delta):
            i += 1
            while i <= n:
                trees[k][i] += delta
                i += i & -i

        def pref(k, i):
            s = 0
            while i > 0:
                s += trees[k][i]
                i -= i & -i
            return s

        cur = list(nums)
        for i, v in enumerate(cur):
            add(depth(v), i, 1)
        answer = []
        for q in queries:
            if q[0] == 1:
                _, l, r, k = q
                answer.append(pref(k, r + 1) - pref(k, l))
            else:
                _, idx, val = q
                add(depth(cur[idx]), idx, -1)
                cur[idx] = val
                add(depth(val), idx, 1)
        return answer
