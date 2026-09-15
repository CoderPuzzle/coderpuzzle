from typing import List


class Solution:
    def findDifferentBinaryString(self, nums: List[str]) -> str:
        # Flip the i-th bit of the i-th string: the result differs from every
        # nums[i] at position i, so it cannot appear anywhere in nums.
        n = len(nums)
        chars = []
        for i in range(n):
            chars.append("1" if nums[i][i] == "0" else "0")
        return "".join(chars)
