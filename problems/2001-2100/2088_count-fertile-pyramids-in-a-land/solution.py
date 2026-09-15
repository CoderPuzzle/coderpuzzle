class Solution:
    def countPyramids(self, grid: list[list[int]]) -> int:
        def count_direction(rows) -> int:
            columns = len(grid[0])
            toward_base = [0] * columns
            total = 0
            for row in rows:
                current = [0] * columns
                for column, fertile in enumerate(row):
                    if fertile:
                        current[column] = 1
                        if 0 < column < columns - 1 and toward_base[column] > 0:
                            current[column] += min(toward_base[column - 1], toward_base[column + 1])
                        total += current[column] - 1
                toward_base = current
            return total

        return count_direction(reversed(grid)) + count_direction(grid)
