from typing import List


class Solution:
    def maximumTripletValue(self, nums: List[int]) -> int:
        n = len(nums)
        # Greatest element strictly to the right of each index.
        suffix = [0] * n
        suffix[n - 1] = nums[n - 1]
        for k in range(n - 2, -1, -1):
            suffix[k] = max(suffix[k + 1], nums[k])
        # Fenwick tree over compressed ranks, storing prefix maxima of the
        # values inserted so far; query(rank - 1) yields the greatest earlier
        # value strictly smaller than nums[j].
        ranks = {value: index + 1 for index, value in enumerate(sorted(set(nums)))}
        size = len(ranks)
        tree = [0] * (size + 1)

        def update(rank: int, value: int) -> None:
            while rank <= size:
                if value > tree[rank]:
                    tree[rank] = value
                rank += rank & -rank

        def query(rank: int) -> int:
            best = 0
            while rank > 0:
                if tree[rank] > best:
                    best = tree[rank]
                rank -= rank & -rank
            return best

        # Every triplet value nums[i] - nums[j] + nums[k] stays within
        # (-10^9, 10^9) because nums[i] < nums[j] < nums[k] <= 10^9.
        best = -(1 << 60)
        update(ranks[nums[0]], nums[0])
        for j in range(1, n - 1):
            left = query(ranks[nums[j]] - 1)
            if left and nums[j] < suffix[j + 1]:
                best = max(best, left - nums[j] + suffix[j + 1])
            update(ranks[nums[j]], nums[j])
        return best
