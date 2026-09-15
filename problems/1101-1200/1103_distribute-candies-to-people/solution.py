from typing import List


class Solution:
    def distributeCandies(self, candies: int, num_people: int) -> List[int]:
        # Hand out one gift per turn, cycling through the row. Each turn the
        # gift grows by one; when fewer candies remain than the next gift,
        # the current person takes what is left and the loop ends.
        result = [0] * num_people
        give = 1
        index = 0
        while candies > 0:
            take = min(give, candies)
            result[index % num_people] += take
            candies -= take
            give += 1
            index += 1
        return result
