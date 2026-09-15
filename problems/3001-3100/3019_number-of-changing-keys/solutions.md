# Solutions — Number of Changing Keys

## Lowercase scan

Shift and caps lock change what appears on screen, not which key was
pressed, so two letters that differ only by case never mark a change.
Lowercasing `s` collapses every press to its true key, and after that
collapse a change of key is exactly an adjacent pair of positions holding
different letters.

The code lowers the string once and walks it from the second character on,
counting every position whose key differs from its predecessor. The first
position has no predecessor and so can never start a change, leaving
`n - 1` comparisons for a string of length `n`.

**Complexity:** `O(n)` time, `O(n)` space.
