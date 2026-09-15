class Solution:
    def reversePairs(self, nums: list[int]) -> int:
        # Fenwick over compressed ranks instead of merge-sort counting: walk
        # right-to-left, so by the time the walk reaches an entry the tree
        # holds exactly the entries to that entry's right.
        vals = sorted(set(nums))
        # Thresholds ride beside the ranks: x qualifies against v exactly
        # when 2 * v < x, and doubling stays wide so both int32 extremes
        # remain honest (Python's ints never wrap anyway).
        doubled = [2 * v for v in vals]
        size = len(vals)
        bit = [0] * (size + 1)

        def update(i, delta):
            while i <= size:
                bit[i] += delta
                i += i & (-i)

        def query(i):
            total = 0
            while i > 0:
                total += bit[i]
                i -= i & (-i)
            return total

        def lower_bound(a, target):
            lo, hi = 0, len(a)
            while lo < hi:
                mid = (lo + hi) // 2
                if a[mid] < target:
                    lo = mid + 1
                else:
                    hi = mid
            return lo

        count = 0
        for x in reversed(nums):
            # Every held value with 2 * v < x ranks below the cut, so the
            # prefix query totals exactly the later entries x more than
            # doubles — and querying before inserting keeps x from counting
            # itself.
            count += query(lower_bound(doubled, x))
            update(lower_bound(vals, x) + 1, 1)
        return count
