from typing import List


class Solution:
    def flipgame(self, fronts: List[int], backs: List[int]) -> int:
        # A card printed with the same number on both faces shows that number
        # no matter which way it is flipped, so that number can never be good.
        # Any other printed number can be good: rest one card carrying it with
        # that side down, and every other card — at most one of its two faces
        # carries the number — hides it face down. The flips are independent,
        # so nothing else has to be planned: the answer is the smallest
        # printed number that no both-faces card forces upward.
        forced = {f for f, b in zip(fronts, backs) if f == b}
        best = 0
        for value in fronts + backs:
            if value not in forced and (best == 0 or value < best):
                best = value
        return best
