from bisect import bisect_left, bisect_right


class Solution:
    def countRangeSum(self, nums: list[int], lower: int, upper: int) -> int:
        n = len(nums)
        # Range sums become pairs: count i < j with
        # prefix[j] - prefix[i] in [lower, upper] (leading 0 included).
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + nums[i]
        # Fenwick tree over the coordinate-compressed prefix values: rank r
        # (1-based) counts how many inserted prefixes carry ranks[r - 1].
        ranks = sorted(set(prefix))
        m = len(ranks)
        tree = [0] * (m + 1)

        def add(rank: int) -> None:
            while rank <= m:
                tree[rank] += 1
                rank += rank & -rank

        def count_upto(rank: int) -> int:
            # How many inserted prefixes sit in ranks[0:rank].
            total = 0
            while rank > 0:
                total += tree[rank]
                rank -= rank & -rank
            return total

        count = 0
        add(bisect_left(ranks, prefix[0]) + 1)
        for j in range(1, n + 1):
            p = prefix[j]
            # An earlier prefix e qualifies when lower <= p - e <= upper,
            # i.e. e lies in [p - upper, p - lower]; both bounds come off
            # the tree as rank-prefix counts.
            count += count_upto(bisect_right(ranks, p - lower)) - count_upto(bisect_left(ranks, p - upper))
            # Insert only after querying, so a prefix never pairs itself.
            add(bisect_left(ranks, p) + 1)
        return count
