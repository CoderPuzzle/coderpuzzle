class Solution:
    def minDays(self, n: int) -> int:
        # Two moves are ever worth trying from a pile of more than one
        # orange: pay off the remainder mod 2 in single-orange days and
        # then halve, or pay off the remainder mod 3 and take the 2n/3
        # bite. The reachable states from n are the O(log^2 n) numbers
        # produced by repeatedly floor-dividing by 2 or 3, so a hash-map
        # memo keeps the recursion small even for n up to 2 * 10^9.
        memo: dict[int, int] = {}

        def dp(remaining: int) -> int:
            if remaining <= 1:
                return remaining
            if remaining in memo:
                return memo[remaining]
            days = min(remaining % 2 + 1 + dp(remaining // 2), remaining % 3 + 1 + dp(remaining // 3))
            memo[remaining] = days
            return days

        return dp(n)
