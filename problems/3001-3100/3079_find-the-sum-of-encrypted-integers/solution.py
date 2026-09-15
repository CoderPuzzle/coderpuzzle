from typing import List


class Solution:
    def sumOfEncryptedInt(self, nums: List[int]) -> int:
        # Encrypting x keeps its digit count but replaces every digit with
        # the largest one, so the result is largest * repunit(length). Both
        # fall out of one digit scan: p grows as 1, 11, 111, ... while m
        # tracks the max digit seen.
        total = 0
        for num in nums:
            largest = 0
            repunit = 0
            while num > 0:
                largest = max(largest, num % 10)
                repunit = repunit * 10 + 1
                num //= 10
            total += largest * repunit
        return total
