class Solution:
    def coloredCells(self, n: int) -> int:
        # The blue region after minute n is a diamond of Chebyshev
        # radius n-1 around the first cell. Ring k (k >= 1) adds 4*k
        # cells, so the total is 1 + 4*(0+1+...+(n-1)) = 2n^2 - 2n + 1.
        # At n = 10^5 that is about 2*10^10 -- beyond 32 bits, which is
        # why the answer travels as a 64-bit integer on the wire.
        return 2 * n * n - 2 * n + 1
