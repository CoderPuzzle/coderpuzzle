from typing import List, Optional


class Solution:
    def areSimilar(self, mat: List[List[int]], k: int) -> bool:
        # After k steps an even row is its original left-rotated by k and an
        # odd row its original right-rotated by k, both mod the row length.
        # A row is invariant under rotation by d exactly when it is
        # invariant under -d, so one modular comparison per cell settles
        # both parities and no intermediate matrices are built.
        n = len(mat[0])
        d = k % n
        if d == 0:
            return True
        for row in mat:
            for j in range(n):
                if row[j] != row[(j + d) % n]:
                    return False
        return True
