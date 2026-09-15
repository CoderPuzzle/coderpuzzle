from typing import List


class Solution:
    def employeeFreeTime(self, schedule: List[List[List[int]]]) -> List[List[int]]:
        # A moment is free exactly when no employee is busy, so only the
        # union matters: pool every interval, forgetting ownership.
        intervals = sorted(interval for employee in schedule for interval in employee)
        free: List[List[int]] = []
        previous_end = None
        for start, end in intervals:
            # Starting strictly beyond the furthest end seen so far proves
            # nothing covers (previous_end, start); strictness keeps
            # touching intervals continuous (no zero-length gaps).
            if previous_end is not None and start > previous_end:
                free.append([previous_end, start])
            # Otherwise merge into the busy block, keeping the running max
            # of ends so a long interval absorbs shorter ones inside it.
            previous_end = end if previous_end is None else max(previous_end, end)
        # No interval triggers the infinite gaps before the first or
        # after the last block, so they never surface.
        return free
