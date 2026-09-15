class Solution:
    def minSensors(self, n: int, m: int, k: int) -> int:
        # A radius-k sensor covers an s x s square with s = 2 * k + 1, so
        # tile the grid: ceil(n / s) row strips times ceil(m / s) column
        # strips, one sensor per block.
        side = 2 * k + 1
        return ((n + side - 1) // side) * ((m + side - 1) // side)
