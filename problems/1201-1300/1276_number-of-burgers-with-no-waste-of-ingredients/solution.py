from typing import List


class Solution:
    def numOfBurgers(self, tomatoSlices: int, cheeseSlices: int) -> List[int]:
        # Solve the system: 4J + 2S = tomatoes, J + S = cheese. Doubling
        # the cheese equation and subtracting isolates jumbo:
        # 2J = tomatoes - 2*cheese, so J = (tomatoes - 2*cheese) / 2.
        # The pair exists iff that quotient is a non-negative integer and
        # the back-solved small count is too.
        two_jumbo = tomatoSlices - 2 * cheeseSlices
        if two_jumbo < 0 or two_jumbo % 2 != 0:
            return []
        jumbo = two_jumbo // 2
        small = cheeseSlices - jumbo
        if small < 0:
            return []
        return [jumbo, small]
