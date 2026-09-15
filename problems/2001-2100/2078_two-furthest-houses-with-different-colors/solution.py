from typing import List


class Solution:
    def maxDistance(self, colors: List[int]) -> int:
        last = len(colors) - 1
        answer = 0
        for index, color in enumerate(colors):
            if color != colors[0]:
                answer = max(answer, index)
            if color != colors[last]:
                answer = max(answer, last - index)
        return answer
