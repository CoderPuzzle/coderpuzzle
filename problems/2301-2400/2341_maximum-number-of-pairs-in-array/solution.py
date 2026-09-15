from typing import Counter, List


class Solution:
    def numberOfPairs(self, nums: List[int]) -> List[int]:
        counts = Counter(nums)
        pairs = sum(count // 2 for count in counts.values())
        leftovers = sum(count % 2 for count in counts.values())
        return [pairs, leftovers]
