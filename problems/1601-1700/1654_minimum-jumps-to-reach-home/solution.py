from collections import deque
from typing import List, Optional


class Solution:
    def minimumJumps(self, forbidden: List[int], a: int, b: int, x: int) -> int:
        """Treat the line as a graph whose nodes are (position, back) pairs,
        back marking that the previous jump went backward — the state that
        forbids a second consecutive backward jump. Breadth-first search by
        jump count reaches home in the fewest jumps; the line only needs to
        be explored up to max(x, max(forbidden)) + a + b, because above that
        line there is nothing to land on that matters, and each backward jump
        must be paid for by a following forward jump, so a useful overshoot
        tops out one forward step plus one backward reach higher.
        """
        limit = max(x, max(forbidden)) + a + b
        blocked = bytearray(limit + 1)
        for position in forbidden:
            blocked[position] = 1
        # seen[position][back] — back == 1 means the previous jump was backward
        seen = bytearray(2 * (limit + 1))
        seen[0] = 1
        frontier = deque([(0, 0)])
        jumps = 0
        while frontier:
            for _ in range(len(frontier)):
                position, back = frontier.popleft()
                if position == x:
                    return jumps
                forward = position + a
                if forward <= limit and not blocked[forward] and not seen[2 * forward]:
                    seen[2 * forward] = 1
                    frontier.append((forward, 0))
                if not back:
                    backward = position - b
                    if backward >= 0 and not blocked[backward] and not seen[2 * backward + 1]:
                        seen[2 * backward + 1] = 1
                        frontier.append((backward, 1))
            jumps += 1
        return -1
