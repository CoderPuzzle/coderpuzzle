from typing import List


class Solution:
    def sumDivisibleByK(self, nums: List[int], k: int) -> int:
        # Qualification is decided per value: drop every element into the
        # bucket of its own value; values are bounded by 100, so the value
        # itself indexes a fixed array of counters.
        counts = [0] * 101
        for num in nums:
            counts[num] += 1
        # A bucket qualifies when its count is a positive multiple of k;
        # it then contributes its value once per occurrence.
        total = 0
        for value in range(1, 101):
            if counts[value] > 0 and counts[value] % k == 0:
                total += value * counts[value]
        return total
