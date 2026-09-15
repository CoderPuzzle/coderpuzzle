class Solution:
    def mostExpensiveItem(self, primeOne: int, primeTwo: int) -> int:
        # Reachability sieve over the prices 0..primeOne*primeTwo: hint 1
        # promises everything above that bound is buyable, so the answer
        # hides somewhere inside. A price is buyable iff dropping one
        # primeOne- or primeTwo-coin leaves a buyable price — walk the
        # sieve upward and remember the largest price that never lights
        # up. The product stays under 10^5, so the sieve is small and
        # the answer fits comfortably in a 32-bit integer.
        limit = primeOne * primeTwo
        reachable = [False] * (limit + 1)
        reachable[0] = True
        best = 0
        for price in range(1, limit + 1):
            if (price >= primeOne and reachable[price - primeOne]) or (
                price >= primeTwo and reachable[price - primeTwo]
            ):
                reachable[price] = True
            else:
                best = price
        return best
