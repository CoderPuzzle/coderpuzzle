from typing import List


class Solution:
    def numberOfCleanRooms(self, room: List[List[int]]) -> int:
        rows = len(room)
        cols = len(room[0])
        directions = ((0, 1), (1, 0), (0, -1), (-1, 0))
        seen = [False] * (rows * cols * 4)
        cleaned = [False] * (rows * cols)
        row = col = direction = 0
        clean_count = 0

        while not seen[(row * cols + col) * 4 + direction]:
            seen[(row * cols + col) * 4 + direction] = True
            cell = row * cols + col
            if not cleaned[cell]:
                cleaned[cell] = True
                clean_count += 1

            dr, dc = directions[direction]
            next_row = row + dr
            next_col = col + dc
            if next_row < 0 or next_row >= rows or next_col < 0 or next_col >= cols or room[next_row][next_col] == 1:
                direction = (direction + 1) % 4
            else:
                row, col = next_row, next_col
        return clean_count
