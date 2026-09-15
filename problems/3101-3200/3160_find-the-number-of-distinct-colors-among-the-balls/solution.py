from typing import List


class Solution:
    def queryResults(self, limit: int, queries: List[List[int]]) -> List[int]:
        # Two maps carry the whole state: ball -> its current color, and
        # color -> how many balls currently wear it. A query is a pair of
        # counter bumps around a dict read, and the size of the live-color
        # map answers the query without ever rescanning the balls.
        ball_color = {}
        color_count = {}
        result = []
        for ball, color in queries:
            previous = ball_color.get(ball)
            if previous is not None:
                remaining = color_count[previous] - 1
                # The old color vanishes only when its last ball left.
                if remaining == 0:
                    del color_count[previous]
                else:
                    color_count[previous] = remaining
            color_count[color] = color_count.get(color, 0) + 1
            ball_color[ball] = color
            result.append(len(color_count))
        return result
