class Solution:
    def getBiggestThree(self, grid: List[List[int]]) -> List[int]:
        # Enumerate every (center, k) rhombus by walking its four edges;
        # keep distinct sums and return the three largest.
        m, n = len(grid), len(grid[0])
        sums = set()
        for r in range(m):
            for c in range(n):
                k = 0
                while True:
                    if r - k < 0 or r + k >= m or c - k < 0 or c + k >= n:
                        break
                    if k == 0:
                        sums.add(grid[r][c])
                    else:
                        total = 0
                        for i in range(k):
                            total += grid[r - k + i][c - i]
                            total += grid[r + i][c - k + i]
                            total += grid[r + k - i][c + i]
                            total += grid[r - i][c + k - i]
                        sums.add(total)
                    k += 1
        return sorted(sums, reverse=True)[:3]
