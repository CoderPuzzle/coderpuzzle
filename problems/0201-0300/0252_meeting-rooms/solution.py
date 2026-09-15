from typing import List


class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
        # Overlap, if any, must sit between next-door meetings once the
        # order is by start time, so sorting makes one linear pass enough.
        intervals.sort(key=lambda interval: interval[0])
        # A meeting ending exactly when the next begins is fine: the clash
        # test is strictly previous end > next start.
        return all(intervals[i - 1][1] <= intervals[i][0] for i in range(1, len(intervals)))
