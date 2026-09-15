class Solution:
    def minCost(self, n: int) -> int:
        # Every unordered pair of final unit pieces is separated, and charged,
        # exactly once somewhere in the split tree.
        return n * (n - 1) // 2
