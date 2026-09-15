class Solution:
    def twoEggDrop(self, n: int) -> int:
        # cover = tallest building solvable with `moves` moves and 2 eggs.
        cover = 0
        moves = 0
        while cover < n:
            moves += 1
            # First drop goes at cover+1: m-1 floors below for the surviving egg's
            # linear scan, cover(m-1) floors above for the recursive case — so
            # cover(m) = cover(m-1) + m (the triangular numbers m(m+1)/2).
            cover += moves
        # Smallest move budget whose triangular coverage reaches n.
        return moves
