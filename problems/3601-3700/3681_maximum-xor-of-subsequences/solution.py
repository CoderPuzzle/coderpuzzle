from typing import List, Optional


class Solution:
    def maxXorSubsequences(self, nums: List[int]) -> int:
        # A subsequence's XOR only depends on which positions it picks, and
        # XOR-ing two achievable values is again achievable (the subsets'
        # symmetric difference), while any achievable z arises as z ^ 0. So
        # the answer is the largest XOR any subset of nums can form: the
        # classic linear-basis maximum.
        basis = [0] * 30  # basis[b] leads with bit b; nums[i] < 2^30
        for v in nums:
            cur = v
            while cur:
                b = cur.bit_length() - 1
                if basis[b]:
                    cur ^= basis[b]  # dependent: strip the leading bit
                else:
                    basis[b] = cur  # free leading bit: store and stop
                    break
        # Greedy fold, highest pivot first: take a vector iff it grows the
        # answer. An all-zero input leaves the basis empty at 0.
        ans = 0
        for b in range(29, -1, -1):
            if basis[b]:
                cand = ans ^ basis[b]
                if cand > ans:
                    ans = cand
        return ans
