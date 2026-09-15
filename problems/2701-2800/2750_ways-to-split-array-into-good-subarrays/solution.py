from typing import List


class Solution:
    def numberOfGoodSubarraySplits(self, nums: List[int]) -> int:
        MOD = 10**9 + 7
        answer = 0
        prev = -1  # index of the previous 1; -1 means none seen yet
        for i, value in enumerate(nums):
            if value == 1:
                if prev == -1:
                    # First 1 found: the array is splittable, empty product = 1.
                    answer = 1
                else:
                    # The i - prev - 1 zeros between the ones admit exactly
                    # i - prev separation slots; choices across gaps multiply.
                    answer = answer * (i - prev) % MOD
                prev = i
        return answer
