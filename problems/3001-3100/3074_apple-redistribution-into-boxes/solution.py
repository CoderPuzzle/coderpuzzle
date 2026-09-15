from typing import List


class Solution:
    def minimumBoxes(self, apple: List[int], capacity: List[int]) -> int:
        # Packs split freely across boxes, so only the apple total matters,
        # not its division into packs. Filling the largest boxes first makes
        # each selected box cover as much of the total as possible, so the
        # prefix of the descending-sorted capacities is optimal.
        total = sum(apple)
        capacity.sort(reverse=True)
        filled = 0
        for count, room in enumerate(capacity, start=1):
            filled += room
            if filled >= total:
                return count
        # The input guarantees a full redistribution is possible.
        return len(capacity)
