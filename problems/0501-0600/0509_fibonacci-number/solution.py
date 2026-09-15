class Solution:
    def fib(self, n: int) -> int:
        # Every Fibonacci number is the sum of the two before it, so one walk
        # up from the seeds F(0) = 0 and F(1) = 1 reaches F(n): roll the pair
        # forward and the second variable ends on the answer. Only the last
        # two values ever matter, so nothing is tabulated.
        if n < 2:
            return n
        previous, current = 0, 1
        for _ in range(n - 1):
            previous, current = current, previous + current
        return current
