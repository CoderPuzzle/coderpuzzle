class Solution:
    def maxNumber(self, n: int) -> int:
        # Numbers above 2^m - 1 sit inside [2^m, n], so every value in such a
        # range keeps bit m set and the AND can never fall to zero. x =
        # 2^m - 1 wins because its range contains both itself and 2^m, which
        # AND to zero together. Doubling from 1 finds that power of two.
        power = 1
        while power * 2 <= n:
            power *= 2
        return power - 1
