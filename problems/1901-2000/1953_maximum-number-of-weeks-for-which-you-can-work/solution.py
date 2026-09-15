from typing import List


class Solution:
    def numberOfWeeks(self, milestones: List[int]) -> int:
        # Only the largest project can block the schedule: every milestone
        # of the other projects acts as a separator that lets one extra
        # milestone of the largest project be placed without adjacency. If
        # `rest` (all other milestones) is at least `mx - 1`, each milestone
        # of the largest project gets its own separator and every milestone
        # is scheduled (`total` weeks). Otherwise the best run is `rest`
        # separator-and-large pairs plus one final large milestone, i.e.
        # `2 * rest + 1` weeks.
        total = sum(milestones)
        rest = total - max(milestones)
        return min(total, 2 * rest + 1)
