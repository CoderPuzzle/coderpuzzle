# Find the Key of the Numbers

## Approach: Per-position minimum of padded digits

Padding every number to four digits with leading zeros lines up the three
numbers position by position, and each key digit is then just the smallest
of the three digits at that position: `min(num1[i], num2[i], num3[i])` for
`i` from the thousands place down to the units place.

The padding never has to materialize as text. Reading the digit at
`place` (1000, 100, 10, 1) is `(num / place) % 10`, so a single pass over
the four places accumulates the key as an integer, appending each per-place
minimum with `key = key * 10 + min(...)`. Because the key is accumulated as
a number rather than a string, leading zeros vanish on their own — a key of
"0042" is simply 42, and "0000" is 0.

**Complexity:** O(1) time, O(1) space.
