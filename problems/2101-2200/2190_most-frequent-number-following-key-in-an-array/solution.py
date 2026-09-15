from typing import List


class Solution:
    def mostFrequent(self, nums: List[int], key: int) -> int:
        # Count each value that immediately follows a key occurrence and
        # take the argmax; the input guarantees a unique winner.
        counts = {}
        for i in range(len(nums) - 1):
            if nums[i] == key:
                counts[nums[i + 1]] = counts.get(nums[i + 1], 0) + 1
        return max(counts, key=counts.get)
