from array import array
from typing import List


class Solution:
    def maximumSubarrayXor(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        # One round of the score process turns an array into its adjacent
        # XORs, so unrolling the rounds gives a Pascal-style recurrence
        # over GF(2): score[l][r] = score[l][r-1] ^ score[l+1][r], seeded
        # by the singleton subarrays — binomial coefficients mod 2 decide
        # which elements reach the final XOR. On top of the score rows we
        # fold a running maximum: best[l][r], the largest score of any
        # subarray inside [l..r], splits by endpoints into
        # max(score[l][r], best[l][r-1], best[l+1][r]) — any such subarray
        # either drops the left end, drops the right end, or is [l..r]
        # itself. Rows are built for l = n-1 down to 0, keeping only the
        # previous score row while every finished best row is stored, so
        # a query is one lookup into its left endpoint's row: O(n^2 + q)
        # time and O(n^2) stored cells (~8 MB of 4-byte cells at n=2000).
        # Every element is at most 2^31 - 1, so bit 31 is always 0, and
        # the XOR of two bit-31-zero words has bit 31 zero too — by
        # induction every score lies in [0, 2^31 - 1], so the 4-byte
        # array cells never overflow.
        n = len(nums)
        best_rows = [None] * n
        prev_score = []
        prev_best = []
        for left in range(n - 1, -1, -1):
            width = n - left
            cur_score = [0] * width
            cur_best = [0] * width
            cur_score[0] = cur_best[0] = nums[left]
            for j in range(1, width):
                s = cur_score[j - 1] ^ prev_score[j - 1]
                cur_score[j] = s
                cur_best[j] = max(s, cur_best[j - 1], prev_best[j - 1])
            best_rows[left] = array("i", cur_best)
            prev_score = cur_score
            prev_best = cur_best
        return [best_rows[left][right - left] for left, right in queries]
