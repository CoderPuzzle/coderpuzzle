class Solution:
    def minMoves(self, sx: int, sy: int, tx: int, ty: int) -> int:
        # Work backwards from (tx, ty): with x > y the last move must have
        # raised x, so the predecessor is unique. x >= 2y means x was doubled
        # (halve it, requiring even x); otherwise y was added to x (subtract).
        moves = 0
        while tx != sx or ty != sy:
            if tx < sx or ty < sy:
                return -1
            if tx == ty:
                # Equal coordinates can only be reached from an axis; step
                # onto the axis the source lies on.
                if sx == 0 and sy > 0:
                    tx = 0
                elif sy == 0 and sx > 0:
                    ty = 0
                else:
                    return -1
            elif tx > ty:
                if tx // 2 >= ty:
                    if tx % 2:
                        return -1
                    tx //= 2
                else:
                    tx -= ty
            else:
                if ty // 2 >= tx:
                    if ty % 2:
                        return -1
                    ty //= 2
                else:
                    ty -= tx
            moves += 1
        return moves
