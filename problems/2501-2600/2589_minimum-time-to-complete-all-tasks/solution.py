from typing import List


class Solution:
    def findMinimumTime(self, tasks: List[List[int]]) -> int:
        # Run each task as late as its window allows: seconds committed at
        # the end of the timeline are inside more upcoming (by end time)
        # windows, so this never steals a second an earlier task needed.
        running = [False] * 2001
        total = 0
        for start, end, duration in sorted(tasks, key=lambda t: t[1]):
            # Reuse whatever is already on inside this window...
            need = duration - sum(running[start : end + 1])
            # ...then book the remainder at the latest free points.
            point = end
            while need > 0:
                if not running[point]:
                    running[point] = True
                    total += 1
                    need -= 1
                point -= 1
        return total
