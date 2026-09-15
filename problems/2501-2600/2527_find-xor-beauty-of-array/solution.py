from functools import reduce
from operator import xor
from typing import List


class Solution:
    def xorBeauty(self, nums: List[int]) -> int:
        # Per bit position b, the XOR of ((nums[i] | nums[j]) & nums[k]) over
        # all triples equals "how many nums have bit b set, mod 2": triples
        # only flip bit b an odd number of times when an odd number of
        # elements carry it. But that is exactly what folding XOR across the
        # array computes in one linear pass — no triplets needed.
        return reduce(xor, nums)
