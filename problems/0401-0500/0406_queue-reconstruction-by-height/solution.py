from typing import List, Optional


class Solution:
    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
        # Tallest first, ties by smaller k: everyone already placed is then
        # taller-or-equal, so inserting at index k puts exactly k such people
        # in front.
        ordered = sorted((list(p) for p in people), key=lambda p: (-p[0], p[1]))
        queue = []
        # Shorter people inserted later never disturb taller people's counts:
        # they are invisible to a "taller or equal" count.
        for person in ordered:
            queue.insert(person[1], person)
        return queue
