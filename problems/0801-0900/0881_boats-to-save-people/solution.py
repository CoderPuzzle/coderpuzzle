from typing import List, Optional


class Solution:
    def numRescueBoats(self, people: List[int], limit: int) -> int:
        people = sorted(people)
        i, j = 0, len(people) - 1
        boats = 0
        while i <= j:
            # The heaviest boards either way; the lightest is their best
            # partner, since a heavier one only risks exceeding the limit.
            # The i < j guard keeps the last person from pairing with themself.
            if i < j and people[i] + people[j] <= limit:
                i += 1
            j -= 1
            boats += 1
        return boats
