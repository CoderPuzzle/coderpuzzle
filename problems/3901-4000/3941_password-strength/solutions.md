# Solutions — Password Strength

## Category sets

Keep one boolean mark per category for lowercase letters, uppercase letters,
digits, and the four special characters. A character contributes only when it
is the first occurrence of its category, so repeated characters cannot add
extra points.

The maximum score is bounded by a small constant: 26 lower-case points, 52
upper-case points, 30 digit points, and 20 special-character points.

**Complexity:** `O(n)` time, `O(1)` space.
