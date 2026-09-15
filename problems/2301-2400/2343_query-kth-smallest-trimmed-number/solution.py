from typing import List


class Solution:
    def smallestTrimmedNumbers(self, nums: List[str], queries: List[List[int]]) -> List[int]:
        # All strings share one length, so trimmed suffixes do too, and
        # lexicographic order on equal-length digit strings equals numeric
        # order — no integer conversion needed (suffixes can exceed 64 bits).
        answer = []
        for k, trim in queries:
            order = sorted(range(len(nums)), key=lambda i: (nums[i][-trim:], i))
            answer.append(order[k - 1])
        return answer
