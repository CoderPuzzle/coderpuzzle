from typing import List, Optional


class Solution:
    def goodTriplets(self, nums1: List[int], nums2: List[int]) -> int:
        n = len(nums1)
        pos2 = [0] * n
        for i, value in enumerate(nums2):
            pos2[value] = i

        tree = [0] * (n + 1)  # Fenwick tree over positions in nums2

        def add(i, delta):
            i += 1
            while i <= n:
                tree[i] += delta
                i += i & -i

        def prefix_sum(i):
            """Sum over indices 0..i inclusive; returns 0 when i < 0."""
            if i < 0:
                return 0
            i += 1
            total = 0
            while i > 0:
                total += tree[i]
                i -= i & -i
            return total

        answer = 0
        for i, value in enumerate(nums1):
            p = pos2[value]
            left = prefix_sum(p - 1)  # values before value in nums1 and in nums2
            # values after value in both arrays
            right = (n - 1 - p) - (i - left)
            answer += left * right
            add(p, 1)
        return answer
