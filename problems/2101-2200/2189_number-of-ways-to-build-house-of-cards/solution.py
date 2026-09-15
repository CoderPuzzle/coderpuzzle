class Solution:
    def houseOfCards(self, n: int) -> int:
        # A row of k triangles costs 3k - 1 cards and each row above has
        # strictly fewer triangles. Count row sequences bottom-up with a
        # memo over (cards left, largest row allowed above).
        from functools import lru_cache

        @lru_cache(maxsize=None)
        def count(remaining: int, allowed_above: int) -> int:
            total = 0
            for k in range(1, min(allowed_above, remaining // 2 + 1) + 1):
                used = 3 * k - 1
                if used > remaining:
                    break
                if used == remaining:
                    total += 1
                else:
                    total += count(remaining - used, k - 1)
            return total

        return count(n, n)
