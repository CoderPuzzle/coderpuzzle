from typing import List


class Solution:
    def taskSchedulerII(self, tasks: List[int], space: int) -> int:
        # Greedily do each task as early as possible: breaks only ever help
        # by making a later same-type task legal sooner, and delaying the
        # current task delays everything after it. Track the last completion
        # day per type; jump the clock when the next task is still blocked.
        # Totals reach ~1e10, past 32-bit range.
        last_day: dict[int, int] = {}
        day = 0
        for task in tasks:
            if task in last_day:
                day = max(day + 1, last_day[task] + space + 1)
            else:
                day += 1
            last_day[task] = day
        return day
