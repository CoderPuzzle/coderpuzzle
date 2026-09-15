from typing import List


class Solution:
    def executeInstructions(self, n: int, startPos: List[int], s: str) -> List[int]:
        answer = []
        directions = {"L": (0, -1), "R": (0, 1), "U": (-1, 0), "D": (1, 0)}
        for start in range(len(s)):
            row, col = startPos
            executed = 0
            for instruction in s[start:]:
                row_change, col_change = directions[instruction]
                next_row = row + row_change
                next_col = col + col_change
                if not (0 <= next_row < n and 0 <= next_col < n):
                    break
                row, col = next_row, next_col
                executed += 1
            answer.append(executed)
        return answer
