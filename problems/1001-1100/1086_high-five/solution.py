from collections import defaultdict
from typing import List


class Solution:
    def highFive(self, items: List[List[int]]) -> List[List[int]]:
        # Bucket every score by student, sort each bucket descending, and
        # average the top five with integer division.
        scores = defaultdict(list)
        for sid, score in items:
            scores[sid].append(score)
        result = []
        for sid in sorted(scores):
            top = sorted(scores[sid], reverse=True)[:5]
            result.append([sid, sum(top) // 5])
        return result
