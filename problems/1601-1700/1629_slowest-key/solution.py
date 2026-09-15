from typing import List, Optional


class Solution:
    def slowestKey(self, releaseTimes: List[int], keysPressed: str) -> str:
        # A single left-to-right scan computes each duration once and keeps
        # the best (longest duration, then lexicographically largest key).
        best_duration = releaseTimes[0]
        best_char = keysPressed[0]
        for i in range(1, len(releaseTimes)):
            duration = releaseTimes[i] - releaseTimes[i - 1]
            char = keysPressed[i]
            if duration > best_duration or (duration == best_duration and char > best_char):
                best_duration = duration
                best_char = char
        return best_char
