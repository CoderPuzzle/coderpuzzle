# Solutions — Sum of Integers with Maximum Digit Range

## Digit extremes

Scan each value's decimal digits while tracking the minimum and maximum
digit. Record its range and keep the largest range seen.

After the scan, add every value whose range equals that maximum.

**Complexity:** `O(n log max(nums))` time, `O(1)` space.
