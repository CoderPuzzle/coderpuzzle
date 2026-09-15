from typing import List


class Solution:
    def minimumValueSum(self, nums: List[int], andValues: List[int]) -> int:
        # Layered DP: g[k] after j rounds = min value sum splitting nums[:k]
        # into exactly j segments matching andValues[:j]. For a fixed right
        # end r the starts l with AND(nums[l..r]) == t form ONE contiguous
        # run inside the classic AND-group list (extending r folds every
        # stored value with nums[r]; duplicates merge), so a transition is a
        # range-minimum over the previous layer. A small iterative segment
        # tree serves those queries.
        n = len(nums)
        INFTY = 1 << 30

        # Per end index: distinct AND values strictly decreasing alongside
        # their smallest start index. Entry i covers starts [starts[i],
        # starts[i-1] - 1] (entry 0 up to r).
        group_vals: List[List[int]] = []
        group_starts: List[List[int]] = []
        vals: List[int] = []
        starts: List[int] = []
        for r, x in enumerate(nums):
            nvals = [x]
            nstarts = [r]
            for i in range(len(vals)):
                v = vals[i] & x
                if v != nvals[-1]:
                    nvals.append(v)
                    nstarts.append(starts[i])
                else:
                    # Same value again: the older group's whole start run
                    # merges into the current tail, anchored further left
                    # (starts arrive in strictly decreasing order).
                    nstarts[-1] = starts[i]
            vals, starts = nvals, nstarts
            group_vals.append(vals[:])
            group_starts.append(starts[:])

        # Segment-tree leaves represent prefix lengths 0..n; layer j reads
        # the previous layer's costs g[p] (a candidate segment nums[l..r]
        # needs cost g[l]).
        prev = [INFTY] * (n + 1)
        prev[0] = 0
        size = n + 1
        for target in andValues:
            tree = [INFTY] * (2 * size)
            tree[size:] = prev
            for k in range(size - 1, 0, -1):
                left, right = tree[2 * k], tree[2 * k + 1]
                tree[k] = left if left < right else right

            cur = [INFTY] * (n + 1)
            for r in range(n):
                vals = group_vals[r]
                starts = group_starts[r]
                lo = -1
                hi = -2
                for gi in range(len(vals)):
                    if vals[gi] == target:
                        lo = starts[gi]
                        hi = starts[gi - 1] - 1 if gi > 0 else r
                        break
                if lo < 0:
                    continue  # this target cannot end at r
                best = INFTY
                l, rr = lo + size, hi + 1 + size  # inclusive [lo..hi]
                while l < rr:
                    if l & 1:
                        if tree[l] < best:
                            best = tree[l]
                        l += 1
                    if rr & 1:
                        rr -= 1
                        if tree[rr] < best:
                            best = tree[rr]
                    l >>= 1
                    rr >>= 1
                if best < INFTY:
                    cur[r + 1] = best + nums[r]
            prev = cur

        return prev[n] if prev[n] < INFTY else -1
