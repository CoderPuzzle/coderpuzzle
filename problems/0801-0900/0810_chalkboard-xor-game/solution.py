from typing import List


class Solution:
    def xorGame(self, nums: List[int]) -> bool:
        # Alice wins exactly when the board already folds to 0 (she wins
        # on the spot) or the count is even, letting her always hand Bob
        # a nonzero odd board he cannot escape.
        xor = 0
        for value in nums:
            xor ^= value
        return xor == 0 or len(nums) % 2 == 0
