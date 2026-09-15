from typing import List


class Solution:
    def constructProductMatrix(self, grid: List[List[int]]) -> List[List[int]]:
        # Division is unavailable: 12345 = 3 * 5 * 823 is composite and grid
        # values routinely share factors with it, so there is no modular
        # inverse to divide by. Flatten the matrix in row-major order —
        # excluding grid[i][j] is excluding one position of that sequence —
        # and multiply the prefix (everything before the position) by the
        # suffix (everything after it). Reducing after every multiply keeps
        # every factor below 12345, so each intermediate product stays below
        # 12345^2 and well inside 32-bit range.
        MOD = 12345
        n, m = len(grid), len(grid[0])
        flat = [v % MOD for row in grid for v in row]
        total = len(flat)
        prefix = [1] * (total + 1)
        suffix = [1] * (total + 1)
        for k in range(total):
            prefix[k + 1] = prefix[k] * flat[k] % MOD
            suffix[total - 1 - k] = suffix[total - k] * flat[total - 1 - k] % MOD
        result: List[List[int]] = [[0] * m for _ in range(n)]
        k = 0
        for i in range(n):
            for j in range(m):
                result[i][j] = prefix[k] * suffix[k + 1] % MOD
                k += 1
        return result
