class Solution:
    def distinctIntegers(self, n: int) -> int:
        # Any x >= 2 on the board pulls in x - 1 (since x % (x - 1) == 1),
        # so the chain walks all the way down to 2. Nothing below 2 can
        # ever appear: i must satisfy i >= 2 to give remainder 1, and
        # 1 itself never does (x % 1 == 0). The board therefore ends as
        # exactly {2..n}, and the 10^9 days dwarf the <= n - 1 day chain.
        return 1 if n == 1 else n - 1
