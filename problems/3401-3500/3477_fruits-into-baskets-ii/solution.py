from typing import List


class Solution:
    def numOfUnplacedFruits(self, fruits: List[int], baskets: List[int]) -> int:
        # The rules fix every decision, so simulate them directly: each fruit
        # takes the leftmost free basket that fits, scanning from index 0.
        used = [False] * len(baskets)
        unplaced = 0
        for quantity in fruits:
            for j in range(len(baskets)):
                # skip occupied baskets and capacities that are too small
                if not used[j] and baskets[j] >= quantity:
                    used[j] = True
                    break
            else:
                # scan ran off the end: nothing fits this fruit
                unplaced += 1
        return unplaced
