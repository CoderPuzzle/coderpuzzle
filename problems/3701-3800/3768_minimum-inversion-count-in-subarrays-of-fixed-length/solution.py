from typing import List


class Solution:
    def minInversionCount(self, nums: List[int], k: int) -> int:
        # Two neighboring windows share k - 1 elements, so the inversion
        # count updates in O(log n) per slide instead of a recount: the
        # element leaving at the front loses its pairs with smaller
        # survivors, the element entering at the back gains pairs with
        # larger survivors. Both are dynamic rank queries over the window's
        # values, so keep the window's elements counted in a Fenwick tree
        # indexed by compressed value.
        #
        # Order matters on every slide: drop the front element from the tree
        # and subtract how many smaller elements it was paired with BEFORE
        # the new element joins, then insert the newcomer and add how many
        # strictly larger elements remain — querying against the wrong
        # intermediate window double-counts when the two values are equal.
        # Strict comparisons throughout: equal neighbors are not inversions.
        vals = sorted(set(nums))
        rank = {v: i + 1 for i, v in enumerate(vals)}
        m = len(vals)
        tree = [0] * (m + 1)

        def update(index: int, delta: int) -> None:
            while index <= m:
                tree[index] += delta
                index += index & -index

        def query(index: int) -> int:
            total = 0
            while index > 0:
                total += tree[index]
                index &= index - 1
            return total

        # Build the first window; size - prefix(rank) counts elements already
        # inside that are strictly greater than the one being added.
        inversions = 0
        size = 0
        for x in nums[:k]:
            rx = rank[x]
            inversions += size - query(rx)
            update(rx, 1)
            size += 1
        best = inversions
        for right in range(k, len(nums)):
            y = nums[right - k]
            ry = rank[y]
            x = nums[right]
            rx = rank[x]
            inversions -= query(ry - 1)
            update(ry, -1)
            inversions += (k - 1) - query(rx)
            update(rx, 1)
            if inversions < best:
                best = inversions
        return best
