from typing import List


class Solution:
    def minSumSquareDiff(self, nums1: List[int], nums2: List[int], k1: int, k2: int) -> int:
        # Only |nums1[i] - nums2[i]| matters: a +1 on either array moves the
        # difference one step in whichever direction we pick, so k1 and k2
        # pool into one budget spent on absolute differences.
        top = max(abs(a - b) for a, b in zip(nums1, nums2))
        counts = [0] * (top + 1)
        for a, b in zip(nums1, nums2):
            counts[abs(a - b)] += 1
        # Lowering an entry from v to v - 1 removes 2v - 1 from the sum,
        # more the larger v is, so a currently largest entry absorbs every
        # operation and none goes past zero (|d| would grow again). Sweep
        # levels downward, move whole buckets while the budget covers them,
        # split the bucket it does not cover.
        budget = k1 + k2
        for level in range(top, 0, -1):
            moved = min(counts[level], budget)
            if moved == 0:
                continue
            counts[level - 1] += moved
            counts[level] -= moved
            budget -= moved
            if budget == 0:
                break
        return sum(level * level * count for level, count in enumerate(counts))
