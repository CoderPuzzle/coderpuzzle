from typing import List


class Solution:
    def filterRestaurants(
        self, restaurants: List[List[int]], veganFriendly: int, maxPrice: int, maxDistance: int
    ) -> List[int]:
        # Inclusive caps; the vegan filter only bites when it is 1. Survivors
        # sort by rating desc, then id desc.
        kept = [
            entry
            for entry in restaurants
            if (veganFriendly == 0 or entry[2] == 1) and entry[3] <= maxPrice and entry[4] <= maxDistance
        ]
        kept.sort(key=lambda entry: (-entry[1], -entry[0]))
        return [entry[0] for entry in kept]
