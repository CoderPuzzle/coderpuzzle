from typing import List, Optional
from collections import deque


class Solution:
    def openLock(self, deadends: List[str], target: str) -> int:
        # BFS over the 10,000 four-digit lock states, one edge per wheel
        # turn: layer order equals turn count, so reaching the target
        # first is optimal.
        dead = set(deadends)
        start = "0000"
        # A deadend start means the wheels can never move.
        if start in dead:
            return -1
        seen = {start}
        queue = deque([(start, 0)])
        while queue:
            state, steps = queue.popleft()
            if state == target:
                return steps
            for i in range(4):
                for delta in (1, -1):
                    # Turn wheel i up or down, wrapping between 0 and 9.
                    digit = (int(state[i]) + delta) % 10
                    nxt = state[:i] + str(digit) + state[i + 1 :]
                    # Mark seen at enqueue time so each state enters the
                    # queue once, and never step on a deadend.
                    if nxt not in seen and nxt not in dead:
                        seen.add(nxt)
                        queue.append((nxt, steps + 1))
        # Queue exhausted: every neighbor is seen or dead, so the lock
        # cannot be opened.
        return -1
