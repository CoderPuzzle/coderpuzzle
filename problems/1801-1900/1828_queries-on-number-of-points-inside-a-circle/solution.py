from typing import List


class Solution:
    def countPoints(self, points: List[List[int]], queries: List[List[int]]) -> List[int]:
        # A point lies in the circle exactly when its squared euclidean
        # distance to the center is at most r*r. Squaring keeps everything
        # in integers (values stay below 2*500*500), so border points are
        # judged exactly where sqrt rounding could misclassify them.
        answer = []
        for xj, yj, rj in queries:
            rr = rj * rj
            answer.append(sum((x - xj) * (x - xj) + (y - yj) * (y - yj) <= rr for x, y in points))
        return answer
