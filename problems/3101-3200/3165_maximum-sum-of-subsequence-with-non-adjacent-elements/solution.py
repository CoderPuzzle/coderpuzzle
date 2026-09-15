from typing import List, Optional

MOD = 10**9 + 7
NEG = -(10**18)


class Solution:
    def maximumSumSubsequence(self, nums: List[int], queries: List[List[int]]) -> int:
        n = len(nums)
        tree = [None] * (4 * n)

        def leaf(x):
            # single element: [i][j] with i = leftmost taken?, j = rightmost taken?
            return ((0, NEG), (NEG, x))

        def merge(left, right):
            best00 = best01 = best10 = best11 = NEG
            for i in range(2):
                for j in range(2):
                    b = NEG
                    for k in range(2):
                        for l in range(2):
                            if k == 1 and l == 1:
                                continue
                            val = left[i][k] + right[l][j]
                            if val > b:
                                b = val
                    if i == 0 and j == 0:
                        best00 = b
                    elif i == 0 and j == 1:
                        best01 = b
                    elif i == 1 and j == 0:
                        best10 = b
                    else:
                        best11 = b
            return ((best00, best01), (best10, best11))

        def build(node, lo, hi):
            if hi - lo == 1:
                tree[node] = leaf(nums[lo])
                return
            mid = (lo + hi) // 2
            build(node * 2, lo, mid)
            build(node * 2 + 1, mid, hi)
            tree[node] = merge(tree[node * 2], tree[node * 2 + 1])

        def update(node, lo, hi, pos, val):
            if hi - lo == 1:
                tree[node] = leaf(val)
                return
            mid = (lo + hi) // 2
            if pos < mid:
                update(node * 2, lo, mid, pos, val)
            else:
                update(node * 2 + 1, mid, hi, pos, val)
            tree[node] = merge(tree[node * 2], tree[node * 2 + 1])

        build(1, 0, n)
        answer = 0
        for pos, val in queries:
            update(1, 0, n, pos, val)
            root = tree[1]
            best = max(root[i][j] for i in range(2) for j in range(2))
            answer = (answer + best) % MOD
        return answer
