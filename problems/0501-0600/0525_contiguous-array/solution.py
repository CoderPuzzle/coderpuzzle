from typing import List


class Solution:
    def findMaxLength(self, nums: List[int]) -> int:
        # Treat 0 as -1 and 1 as +1 and carry the running balance: equal
        # counts cancel, so a repeated balance at i < j bounds an
        # equal-count subarray of length j - i. Keep only the FIRST index
        # of each balance (0 seeded at -1) so every repeat stretches its
        # window as far as possible.
        first = {0: -1}
        best = balance = 0
        for index, value in enumerate(nums):
            balance += 1 if value == 1 else -1
            if balance in first:
                best = max(best, index - first[balance])
            else:
                first[balance] = index
        return best
