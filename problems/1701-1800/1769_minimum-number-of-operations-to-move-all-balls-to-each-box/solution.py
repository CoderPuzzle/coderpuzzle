from typing import List, Optional


class Solution:
    def minOperations(self, boxes: str) -> List[int]:
        # One ball hop between adjacent boxes costs 1, so gathering into
        # box i costs sum |i - j| over boxes j holding a ball. Sweeping
        # left to right, moving the gather point from i-1 to i adds one
        # step per ball at or left of i — so carry (count, ops) forward.
        n = len(boxes)
        answer = [0] * n
        count = ops = 0
        for i in range(n):
            answer[i] += ops
            count += 1 if boxes[i] == "1" else 0
            ops += count
        count = ops = 0
        for i in range(n - 1, -1, -1):
            answer[i] += ops
            count += 1 if boxes[i] == "1" else 0
            ops += count
        return answer
