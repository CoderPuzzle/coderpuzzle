from typing import List


class Solution:
    def findXSum(self, nums: List[int], k: int, x: int) -> List[int]:
        # n <= 50, so each window is recounted directly: one count dict per
        # window, then the distinct values sorted by count descending with
        # the value itself breaking ties. Taking the first x of that order
        # keeps every distinct value when fewer than x exist, which is
        # exactly the "x-sum is the array sum" rule.
        answer = []
        for start in range(len(nums) - k + 1):
            counts = {}
            for i in range(start, start + k):
                counts[nums[i]] = counts.get(nums[i], 0) + 1
            top = sorted(counts, key=lambda value: (-counts[value], -value))[:x]
            answer.append(sum(value * counts[value] for value in top))
        return answer
