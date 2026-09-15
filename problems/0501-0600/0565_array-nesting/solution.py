from typing import List


class Solution:
    def arrayNesting(self, nums: List[int]) -> int:
        # A permutation makes i -> nums[i] a graph where every node has
        # exactly one successor and one predecessor, so the array splits
        # into disjoint cycles; s[k] is exactly the cycle containing k, and
        # every member of that cycle generates the same-length set.
        seen = [False] * len(nums)
        longest = 0
        for start in range(len(nums)):
            if seen[start]:
                continue
            length = 0
            index = start
            while not seen[index]:
                seen[index] = True
                index = nums[index]
                length += 1
            longest = max(longest, length)
        return longest
