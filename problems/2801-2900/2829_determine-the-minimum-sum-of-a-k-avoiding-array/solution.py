class Solution:
    def minimumSum(self, n: int, k: int) -> int:
        below = min(n, k // 2)
        above = n - below
        return below * (below + 1) // 2 + above * k + above * (above - 1) // 2
