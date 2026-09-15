# Solutions — Number of Laser Beams in a Bank

## Multiply consecutive nonempty rows

Count the devices in each row. Empty rows create no beams and do not block them, so only the sequence of nonempty rows matters: for each such row, every device connects to every device in the preceding nonempty row.

Keep the preceding nonzero count and add its product with the current nonzero count, then replace it. This counts each valid beam once, while rows beyond the next nonempty row are correctly blocked by that intervening device row.

**Complexity:** `O(mn)` time and `O(1)` auxiliary space.
