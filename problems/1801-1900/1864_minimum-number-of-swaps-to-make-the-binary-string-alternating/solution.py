class Solution:
    def minSwaps(self, s: str) -> int:
        # Only the two canonical alternating patterns are targets. Each swap
        # fixes exactly two mismatched positions, so a pattern costs
        # mismatches / 2; take the cheaper count-feasible pattern.
        ones = s.count("1")
        n = len(s)
        if abs(2 * ones - n) > 1:
            return -1
        best = -1
        for start in (0, 1):
            pattern_ones = (n + 1) // 2 if start == 0 else n // 2
            if pattern_ones != ones:
                continue
            mism = sum(1 for i, c in enumerate(s) if c != str((i & 1) ^ start ^ 1))
            cost = mism // 2
            if best < 0 or cost < best:
                best = cost
        return best
