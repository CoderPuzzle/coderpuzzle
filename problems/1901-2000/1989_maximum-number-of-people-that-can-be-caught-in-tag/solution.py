from typing import List


class Solution:
    def catchMaximumAmountofPeople(self, team: List[int], dist: int) -> int:
        # Two-pointer greedy over the sorted "it" and "not it" positions:
        # each "it" catches the leftmost uncaught person within its reach.
        it = [i for i, v in enumerate(team) if v == 1]
        not_it = [i for i, v in enumerate(team) if v == 0]
        i = j = caught = 0
        while i < len(it) and j < len(not_it):
            if not_it[j] < it[i] - dist:
                # Too far left: every later "it" is further right, so this
                # person can never be caught; skip them.
                j += 1
            elif not_it[j] > it[i] + dist:
                # Too far right for this "it": it cannot catch anyone among
                # the remaining uncaught people, so move to the next "it".
                i += 1
            else:
                caught += 1
                i += 1
                j += 1
        return caught
