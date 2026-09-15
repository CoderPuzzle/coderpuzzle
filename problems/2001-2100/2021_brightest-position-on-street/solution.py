from collections import defaultdict
from typing import List


class Solution:
    def brightestPosition(self, lights: List[List[int]]) -> int:
        events = defaultdict(int)
        for position, radius in lights:
            events[position - radius] += 1
            events[position + radius + 1] -= 1

        brightness = 0
        best_brightness = 0
        answer = 0
        for coordinate in sorted(events):
            brightness += events[coordinate]
            if brightness > best_brightness:
                best_brightness = brightness
                answer = coordinate
        return answer
