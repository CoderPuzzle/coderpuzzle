from typing import List


class Solution:
    def recoverOrder(self, order: List[int], friends: List[int]) -> List[int]:
        # The roster is capped at eight ids, so a hash set answers every
        # membership test in O(1) expected time.
        wanted = set(friends)
        # Scanning order left to right makes the kept ids emerge already in
        # finishing order -- no sorting step is needed.
        return [racer for racer in order if racer in wanted]
