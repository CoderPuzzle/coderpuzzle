# Solutions — Sort the Jumbled Numbers

## Stable sort on the mapped value

Translate every number into its mapped value once — digit by digit,
least significant first, so leading zeros vanish naturally — and sort
the originals by that key. Stability (or an explicit index tiebreaker in
languages whose sort is not stable) preserves input order among equal
mapped values, and only the key is used for ordering, never returned.

**Complexity:** `O(n log n * d)` time for `d`-digit numbers,
`O(n)` space.
