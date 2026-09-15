from typing import List


class Solution:
    def smallestAbsent(self, nums: List[int]) -> int:
        # A hash set turns "is candidate c present in nums?" into an O(1)
        # lookup, so the answer is found by walking upward from 1.
        present = set(nums)
        total, n = sum(nums), len(nums)
        # Skip candidates at or below the average: candidate > total/n is
        # tested as candidate * n > total, an exact integer comparison --
        # equality fails it, so an integral average excludes itself. The
        # walk starts at 1 because the answer must be positive.
        candidate = 1
        while candidate * n <= total:
            candidate += 1
        while candidate in present:
            candidate += 1
        return candidate
