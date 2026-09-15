from typing import List


class Solution:
    def limitOccurrences(self, nums: List[int], k: int) -> List[int]:
        answer = []
        seen = 0
        previous = None
        for value in nums:
            if value != previous:
                previous = value
                seen = 0
            if seen < k:
                answer.append(value)
                seen += 1
        return answer
