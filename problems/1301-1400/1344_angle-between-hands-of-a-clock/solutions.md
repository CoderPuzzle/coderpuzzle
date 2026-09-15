# Angle Between Hands of a Clock

## Approach: Hand positions in degrees, folded to the smaller angle

The minute hand moves 6° per minute; the hour hand moves 30° per hour
plus 0.5° per minute (its fractional drift inside the hour), so
`hour = 30·(hour mod 12) + 0.5·minutes` and `minute = 6·minutes`. The
absolute difference of the two positions lies in `[0, 360)`, and the two
angles the hands form always sum to 360°, so the smaller one is
`min(diff, 360 - diff)`.

All arithmetic is in half-degree multiples — exact in binary floating
point — so the returned value needs no rounding.

**Complexity:** O(1) time and space.
