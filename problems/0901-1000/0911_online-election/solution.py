from bisect import bisect_right
from typing import List


class TopVotedCandidate:
    """The lead can only change hands when a vote is cast, so the
    constructor reduces the whole history to one array: it walks the votes
    once, keeping running counts and the current leader, and a ballot that
    merely ties the maximum takes the lead — the most recent vote among
    the tied candidates. ``q(t)`` then only has to locate the last vote at
    or before ``t``, which is a binary search because ``times`` is
    strictly increasing, and read the leader recorded there.
    """

    def __init__(self, persons: List[int], times: List[int]) -> None:
        self.times: List[int] = times
        counts = [0] * len(persons)
        leaders: List[int] = []
        best = 0
        leader = 0
        for person in persons:
            counts[person] += 1
            # a tie at the maximum hands the lead to the caster of this very
            # ballot — the most recent vote among the tied candidates
            if counts[person] >= best:
                best = counts[person]
                leader = person
            leaders.append(leader)
        self.leaders = leaders

    def q(self, t: int) -> int:
        # upper bound minus one: the last vote at or before t, so a ballot
        # cast exactly at t counts
        return self.leaders[bisect_right(self.times, t) - 1]
