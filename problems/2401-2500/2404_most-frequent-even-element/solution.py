from typing import List


class Solution:
    def mostFrequentEven(self, nums: List[int]) -> int:
        counts = {}
        for num in nums:
            if num % 2 == 0:
                counts[num] = counts.get(num, 0) + 1
        best_value = -1
        best_count = 0
        for value, count in counts.items():
            if count > best_count or (count == best_count and value < best_value):
                best_count = count
                best_value = value
        return best_value
