from typing import List


class Solution:
    def maximumTop(self, nums: List[int], k: int) -> int:
        # Which tops are reachable in exactly k moves is pure move-budget
        # casework; each branch is answered without simulating k moves.
        n = len(nums)
        if k == 0:
            return nums[0]
        if n == 1:
            # The lone element alternates removed/back, so odd k empties it.
            return nums[0] if k % 2 == 0 else -1
        if k == 1:
            # No removed elements exist yet, so the single move is a pop.
            return nums[1]
        if k > n:
            # Remove everything, burn all but the last move in pop/push
            # pairs, then push the maximum back on.
            return max(nums)
        # 2 <= k <= n: either k pure removals expose nums[k], or removals
        # plus one push-back land any nums[i] with i <= k-2 on top.
        best = nums[k] if k < n else -1
        for i in range(k - 1):
            if nums[i] > best:
                best = nums[i]
        return best
