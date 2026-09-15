from typing import List


class Solution:
    def queensAttacktheKing(self, queens: List[List[int]], king: List[int]) -> List[List[int]]:
        board = [[False] * 8 for _ in range(8)]
        for x, y in queens:
            board[x][y] = True
        out = []
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                if dx == 0 and dy == 0:
                    continue
                # First queen on each ray attacks; she also blocks the rest.
                x, y = king[0] + dx, king[1] + dy
                while 0 <= x < 8 and 0 <= y < 8:
                    if board[x][y]:
                        out.append([x, y])
                        break
                    x += dx
                    y += dy
        return out
