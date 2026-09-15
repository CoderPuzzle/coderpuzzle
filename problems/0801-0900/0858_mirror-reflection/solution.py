class Solution:
    def mirrorReflection(self, p: int, q: int) -> int:
        # Unfolding the mirrored room into a straight corridor turns the
        # ray into the line y = (q/p)x: it first reaches a corner of the
        # tiling after crossing p/g rooms across and q/g rooms up, where
        # g is the gcd of p and q. Folding the counts back, an odd count
        # across ends on the east wall (an even one on the west) and an
        # odd count up ends on the north wall (an even one on the south).
        # The coprime pair p/g, q/g is never both even, so it picks the
        # receptor directly: east-north 1, west-north 2, east-south 0.
        a, b = p, q
        while b:
            a, b = b, a % b
        p //= a
        q //= a
        if p % 2 == 0:
            return 2
        return 1 if q % 2 else 0
