from typing import List


class Solution:
    def cycleLengthQueries(self, n: int, queries: List[List[int]]) -> List[int]:
        # Adding edge (a, b) closes exactly one cycle: the unique tree path
        # between a and b plus the new edge. Walking the deeper endpoint up
        # one parent (v // 2) at a time until both endpoints meet visits
        # exactly the edges of that path, so the answer is one more than
        # the number of steps taken. Values stay below 2^30, so each walk
        # is at most 30 steps.
        answer = []
        for a, b in queries:
            steps = 1
            while a != b:
                if a > b:
                    a //= 2
                else:
                    b //= 2
                steps += 1
            answer.append(steps)
        return answer
