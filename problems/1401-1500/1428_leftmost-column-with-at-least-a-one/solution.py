class Solution:
    def leftMostColumnWithOne(self, binaryMatrix: BinaryMatrix) -> int:
        rows, cols = binaryMatrix.dimensions()
        # Staircase from the top-right corner: on a 1 this is the best
        # column so far (step left — nothing further right matters), on a 0
        # this row is exhausted at or after this column (step down).
        answer = -1
        row, col = 0, cols - 1
        while row < rows and col >= 0:
            if binaryMatrix.get(row, col) == 1:
                answer = col
                col -= 1
            else:
                row += 1
        return answer
