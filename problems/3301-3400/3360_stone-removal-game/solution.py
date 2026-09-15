class Solution:
    def canAliceWin(self, n: int) -> bool:
        # Simulate the forced play: removal sizes drop 10, 9, 8, ... and
        # whoever faces a pile smaller than their removal size loses.
        alice_to_move = True
        take = 10
        while n >= take:
            n -= take
            take -= 1
            alice_to_move = not alice_to_move
        return not alice_to_move
