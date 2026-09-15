class Solution:
    def climbStairs(self, n: int) -> int:
        # ways(i) obeys the Fibonacci recurrence: the last move onto step i
        # is a 1-step from i-1 or a 2-step from i-2, and the two groups are
        # disjoint and exhaustive, so ways(i) = ways(i-1) + ways(i-2).
        prev, curr = 1, 1  # ways(0) = 1 (the empty climb), ways(1) = 1
        for _ in range(n - 1):
            prev, curr = curr, prev + curr
        return curr
