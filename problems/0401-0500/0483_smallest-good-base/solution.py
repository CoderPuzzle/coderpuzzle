class Solution:
    def smallestGoodBase(self, n: str) -> str:
        value = int(n)
        # An all-ones representation is a geometric sum 1 + k + ... + k^m.
        # Scan lengths longest-first: at a fixed total, more terms force
        # every term - the base included - to be smaller, so the first
        # length that admits an integer base already carries the smallest
        # one.
        for m in range(60, 1, -1):
            base = self._base_for_length(value, m)
            if base:
                return str(base)
        # No representation of three 1s or longer fits; "11" in base
        # value - 1 always does.
        return str(value - 1)

    def _base_for_length(self, value: int, m: int) -> int:
        # 1 + k + ... + k^m rises strictly with k, so grow a power-of-two
        # bound past the target, then bisect down to the smallest base
        # whose sum reaches value; that base is the hit when the sum
        # equals value exactly.
        hi = 2
        while self._sum_capped(hi, m, value) <= value:
            hi *= 2
        lo = 2
        while lo < hi:
            mid = (lo + hi) // 2
            if self._sum_capped(mid, m, value) < value:
                lo = mid + 1
            else:
                hi = mid
        return lo if self._sum_capped(lo, m, value) == value else 0

    def _sum_capped(self, k: int, m: int, value: int) -> int:
        # The geometric sum, capped at "already past value": comparing the
        # term against value // k before multiplying is the overflow
        # guard - no stored number ever exceeds 2 * value <= 2 * 10^18,
        # which fits the 64-bit integers the fixed-width languages carry.
        total = 1
        term = 1
        for _ in range(m):
            if term > value // k:
                return value + 1
            term *= k
            total += term
            if total > value:
                return value + 1
        return total
