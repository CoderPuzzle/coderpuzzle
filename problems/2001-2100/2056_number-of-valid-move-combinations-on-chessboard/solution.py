from typing import List


class Solution:
    def countCombinations(self, pieces: List[str], positions: List[List[int]]) -> int:
        orthogonal = ((1, 0), (-1, 0), (0, 1), (0, -1))
        diagonal = ((1, 1), (1, -1), (-1, 1), (-1, -1))

        options = []
        for piece, (row, column) in zip(pieces, positions):
            directions = diagonal if piece == "bishop" else orthogonal
            if piece == "queen":
                directions = orthogonal + diagonal
            moves = [(0, 0, 0)]
            for dr, dc in directions:
                steps = 1
                while 1 <= row + dr * steps <= 8 and 1 <= column + dc * steps <= 8:
                    moves.append((dr, dc, steps))
                    steps += 1
            options.append(moves)

        chosen = []

        def compatible(index: int, move: tuple[int, int, int], other: int) -> bool:
            dr, dc, steps = move
            other_dr, other_dc, other_steps = chosen[other]
            for second in range(8):
                row = positions[index][0] + dr * min(second, steps)
                column = positions[index][1] + dc * min(second, steps)
                other_row = positions[other][0] + other_dr * min(second, other_steps)
                other_column = positions[other][1] + other_dc * min(second, other_steps)
                if row == other_row and column == other_column:
                    return False
            return True

        def search(index: int) -> int:
            if index == len(pieces):
                return 1
            total = 0
            for move in options[index]:
                if all(compatible(index, move, other) for other in range(index)):
                    chosen.append(move)
                    total += search(index + 1)
                    chosen.pop()
            return total

        return search(0)
