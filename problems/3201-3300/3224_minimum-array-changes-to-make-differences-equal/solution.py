from typing import List


class Solution:
    def minChanges(self, nums: List[int], k: int) -> int:
        # Every symmetric pair (nums[i], nums[n-1-i]) must end up exactly d
        # apart for one shared difference d, so the answer is the cheapest
        # per-pair total over all k + 1 candidates. Sorted as lo <= hi, a
        # pair whose difference already equals d costs 0; otherwise one
        # replacement fixes it exactly when the moved value stays inside
        # [0, k], which is equivalent to d <= hi or d <= k - lo; failing
        # that, the pair costs 2. Bucket exact matches and add a +1 range
        # mark for each one-change reach, then sweep d once: cost(d) =
        # n - reachable(d) - exact(d). Totals stay below n, well inside
        # 32-bit range.
        half = len(nums) // 2
        exact = [0] * (k + 1)
        delta = [0] * (k + 2)
        for i in range(half):
            a, b = nums[i], nums[len(nums) - 1 - i]
            if a > b:
                a, b = b, a
            exact[b - a] += 1
            reach = b if b >= k - a else k - a
            delta[0] += 1
            delta[reach + 1] -= 1
        best = 2 * half
        reachable = 0
        for d in range(k + 1):
            reachable += delta[d]
            best = min(best, 2 * half - reachable - exact[d])
        return best
