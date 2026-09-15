from typing import List


class Solution:
    def mostVisited(self, n: int, rounds: List[int]) -> List[int]:
        # Only the first and last sectors of the whole marathon matter: every
        # full lap around the track visits every sector once, so the total
        # visit count only differs on the final, partial lap. That partial
        # lap is exactly the arc from rounds[0] to rounds[-1].
        start, end = rounds[0], rounds[-1]
        if start <= end:
            return list(range(start, end + 1))
        # The arc wraps past sector n back to sector 1.
        return list(range(1, end + 1)) + list(range(start, n + 1))
