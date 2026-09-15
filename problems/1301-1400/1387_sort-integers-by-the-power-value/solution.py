class Solution:
    def getKth(self, lo: int, hi: int, k: int) -> int:
        # Memoized path replay: walk each value's Collatz chain, recording
        # the route until it lands on a value whose power is already known,
        # then back-fill the recorded path. Fully iterative, and shared
        # steps between values are computed once.
        memo = {1: 0}

        def power(x: int) -> int:
            path = []
            while x not in memo:
                path.append(x)
                x = x // 2 if x % 2 == 0 else 3 * x + 1
            steps = memo[x]
            for value in reversed(path):
                steps += 1
                memo[value] = steps
            return memo[path[0]] if path else steps

        ordered = sorted(range(lo, hi + 1), key=lambda value: (power(value), value))
        return ordered[k - 1]
