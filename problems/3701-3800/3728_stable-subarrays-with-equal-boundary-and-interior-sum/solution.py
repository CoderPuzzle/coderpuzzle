from typing import List


class Solution:
    def countStableSubarrays(self, capacity: List[int]) -> int:
        n = len(capacity)
        prefix = [0] * n
        prefix[0] = capacity[0]
        for i in range(1, n):
            prefix[i] = prefix[i - 1] + capacity[i]
        # With p the inclusive prefix sums, [l, r] is stable exactly when
        # (capacity[l], p[l]) equals (capacity[r], p[r - 1] - capacity[r]):
        # equal boundary values, and an interior sum that reduces to plain
        # prefix equality.
        seen = {}
        count = 0
        for r in range(2, n):
            left = r - 2
            key = (capacity[left], prefix[left])
            seen[key] = seen.get(key, 0) + 1
            count += seen.get((capacity[r], prefix[r - 1] - capacity[r]), 0)
        return count
