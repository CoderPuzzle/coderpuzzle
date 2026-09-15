from typing import List


class Solution:
    def readBinaryWatch(self, turnedOn: int) -> List[str]:
        # Hours outer, minutes inner: the walk emits the pinned chronological
        # order directly, with no post-sort.
        times: List[str] = []
        for hour in range(12):
            for minute in range(60):
                # A time shows when its lit hour LEDs plus lit minute LEDs
                # equal turnedOn; each lit count is just a popcount.
                if bin(hour).count("1") + bin(minute).count("1") == turnedOn:
                    # "%d:%02d": no hour leading zero, always two minute digits.
                    times.append(f"{hour}:{minute:02d}")
        return times
