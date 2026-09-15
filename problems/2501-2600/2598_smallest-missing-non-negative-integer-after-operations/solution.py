from typing import List


class Solution:
    def findSmallestInteger(self, nums: List[int], value: int) -> int:
        # Adding or subtracting value never changes an element's
        # residue mod value, so element x can be retargeted anywhere in
        # its own residue class. Count how many elements land in each
        # residue (Python's % is already non-negative), then consume
        # targets 0, 1, 2, ... in order — target t draws one element
        # from class t % value. The first target whose class is
        # exhausted is the largest achievable MEX.
        count = {}
        for x in nums:
            r = x % value
            count[r] = count.get(r, 0) + 1
        mex = 0
        while count.get(mex % value, 0) > 0:
            count[mex % value] -= 1
            mex += 1
        return mex
