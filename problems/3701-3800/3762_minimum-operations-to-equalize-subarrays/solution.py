from bisect import bisect_right
from typing import List


class Solution:
    def minOperations(self, nums: List[int], k: int, queries: List[List[int]]) -> List[int]:
        n = len(nums)
        # Remainder runs: a window is equalizable iff it sits inside one
        # maximal run of equal remainders, i.e. iff l and r share a mark.
        run = [0] * n
        for i in range(1, n):
            run[i] = run[i - 1] + (1 if nums[i] % k != nums[i - 1] % k else 0)
        quot = [v // k for v in nums]
        # Merge sort tree over the quotients: each node keeps its values
        # sorted plus prefix sums of that order.
        tree_vals = [None] * (4 * n)
        tree_pref = [None] * (4 * n)

        def build(node: int, lo: int, hi: int) -> None:
            if lo == hi:
                tree_vals[node] = [quot[lo]]
                tree_pref[node] = [0, quot[lo]]
                return
            mid = (lo + hi) // 2
            build(2 * node, lo, mid)
            build(2 * node + 1, mid + 1, hi)
            merged = sorted(tree_vals[2 * node] + tree_vals[2 * node + 1])
            pref = [0]
            for value in merged:
                pref.append(pref[-1] + value)
            tree_vals[node] = merged
            tree_pref[node] = pref

        build(1, 0, n - 1)
        piece_vals: list[list[int]] = []
        piece_pref: list[list[int]] = []

        def decompose(l: int, r: int) -> None:
            piece_vals.clear()
            piece_pref.clear()
            stack = [(1, 0, n - 1)]
            while stack:
                node, lo, hi = stack.pop()
                if r < lo or hi < l:
                    continue
                if l <= lo and hi <= r:
                    piece_vals.append(tree_vals[node])
                    piece_pref.append(tree_pref[node])
                    continue
                mid = (lo + hi) // 2
                stack.append((2 * node, lo, mid))
                stack.append((2 * node + 1, mid + 1, hi))

        def count_le_sum_le(x: int) -> tuple[int, int]:
            count = total = 0
            for idx in range(len(piece_vals)):
                cut = bisect_right(piece_vals[idx], x)
                count += cut
                total += piece_pref[idx][cut]
            return count, total

        answers = []
        for l, r in queries:
            if run[l] != run[r]:
                answers.append(-1)
                continue
            decompose(l, r)
            # Smallest quotient whose inclusive rank reaches the lower
            # median; the decomposition's node set is fixed throughout.
            need = (r - l + 2) // 2
            lo = min(v[0] for v in piece_vals)
            hi = max(v[-1] for v in piece_vals)
            while lo < hi:
                mid = (lo + hi) // 2
                count, _ = count_le_sum_le(mid)
                if count >= need:
                    hi = mid
                else:
                    lo = mid + 1
            median = lo
            size = r - l + 1
            c_at, s_at = count_le_sum_le(median)
            c_below, s_below = count_le_sum_le(median - 1)
            grand_total = sum(pref[-1] for pref in piece_pref)
            # Below-median elements climb by their shortfall; above-median
            # ones descend by their excess; equals cost nothing.
            answers.append((median * c_below - s_below) + ((grand_total - s_at) - median * (size - c_at)))
        return answers
