from typing import List, Optional


class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        # Sort by start (end as tiebreaker) so any interval overlapping an
        # earlier one must overlap or touch the most recent merged interval;
        # a sweep that only tracks the last merged interval then suffices.
        # sorted() also copies, leaving the input untouched.
        ordered = sorted(intervals, key=lambda item: (item[0], item[1]))
        merged = []
        for start, end in ordered:
            # `<=` counts touching intervals as overlapping, as required.
            # The start is already covered, so only the right edge matters.
            if merged and start <= merged[-1][1]:
                # Raise the right edge when larger; an interval fully
                # swallowed by the merge leaves it untouched.
                if end > merged[-1][1]:
                    merged[-1][1] = end
            else:
                # No overlap with the last merged interval: new group.
                merged.append([start, end])
        return merged
