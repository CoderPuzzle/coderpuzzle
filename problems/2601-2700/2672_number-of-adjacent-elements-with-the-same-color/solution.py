from typing import List


class Solution:
    def colorTheArray(self, n: int, queries: List[List[int]]) -> List[int]:
        # Only the painted cell's two neighbor pairs can flip status in one
        # query: score their contribution before the repaint, then after,
        # and slide the running total by the difference.
        colors = [0] * n
        same = 0
        answer = []
        for index, color in queries:
            for j in (index - 1, index + 1):
                if 0 <= j < n and colors[j] != 0 and colors[j] == colors[index]:
                    same -= 1
            colors[index] = color
            for j in (index - 1, index + 1):
                if 0 <= j < n and colors[j] != 0 and colors[j] == color:
                    same += 1
            answer.append(same)
        return answer
