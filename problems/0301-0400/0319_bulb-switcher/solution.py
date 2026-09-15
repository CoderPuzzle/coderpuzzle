import math


class Solution:
    def bulbSwitch(self, n: int) -> int:
        # Round d toggles bulb i exactly when d divides i, so bulb i flips
        # once per divisor and ends on iff that divisor count is odd.
        # Divisors pair d with i / d; only a perfect square leaves its middle
        # divisor d = i / d unpaired, so the bulbs still on are exactly the
        # squares 1, 4, 9, … — Example 1 ends [on, off, off] with bulb 1
        # alone lit. math.isqrt counts the squares <= n with no float
        # rounding anywhere.
        return math.isqrt(n)
