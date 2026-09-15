from typing import List


class Solution:
    def haveConflict(self, event1: List[str], event2: List[str]) -> bool:
        # Each "HH:MM" is one minute-of-day integer, so each event is an
        # inclusive integer interval. Two inclusive intervals intersect
        # exactly when neither starts after the other ends.
        start1 = int(event1[0][:2]) * 60 + int(event1[0][3:])
        end1 = int(event1[1][:2]) * 60 + int(event1[1][3:])
        start2 = int(event2[0][:2]) * 60 + int(event2[0][3:])
        end2 = int(event2[1][:2]) * 60 + int(event2[1][3:])
        return start1 <= end2 and start2 <= end1
