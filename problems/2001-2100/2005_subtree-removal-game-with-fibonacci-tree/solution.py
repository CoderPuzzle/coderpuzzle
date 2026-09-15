class Solution:
    def findGameWinner(self, n: int) -> bool:
        two_back = 0
        one_back = 0
        child_xor = 0

        for _ in range(n):
            child_xor = two_back ^ one_back
            current = 1 + child_xor
            two_back, one_back = one_back, current

        return child_xor != 0
