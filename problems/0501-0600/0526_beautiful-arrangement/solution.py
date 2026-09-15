class Solution:
    def countArrangement(self, n: int) -> int:
        # candidates[p]: the values position p admits — the divisors of p
        # and the multiples of p up to n, the only values that can satisfy
        # either divisibility condition at that position.
        candidates = [[] for _ in range(n + 1)]
        for p in range(1, n + 1):
            for v in range(1, n + 1):
                if v % p == 0 or p % v == 0:
                    candidates[p].append(v)
        used = [False] * (n + 1)

        def fill(pos: int) -> int:
            if pos > n:
                # Every position holds a value: one complete beautiful
                # arrangement.
                return 1
            total = 0
            for v in candidates[pos]:
                if not used[v]:
                    used[v] = True
                    total += fill(pos + 1)
                    used[v] = False
            return total

        return fill(1)
