class Solution:
    def minimumSwap(self, s1: str, s2: str) -> int:
        # Each swap fixes two mismatches, so an odd total is impossible.
        xy = sum(1 for a, b in zip(s1, s2) if a == "x" and b == "y")
        yx = sum(1 for a, b in zip(s1, s2) if a == "y" and b == "x")
        if (xy + yx) % 2 == 1:
            return -1
        # Same-shape pairs cost 1 each; one leftover pair of each shape costs 2.
        return xy // 2 + yx // 2 + (2 if xy % 2 == 1 else 0)
