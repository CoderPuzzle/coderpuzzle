from typing import List


class Solution:
    def decompressRLElist(self, nums: List[int]) -> List[int]:
        # Read [freq, val] pairs two at a time; each pair appends freq copies
        # of val, so pairs concatenate in input order by construction.
        out = []
        for i in range(0, len(nums), 2):
            out.extend([nums[i + 1]] * nums[i])
        return out
