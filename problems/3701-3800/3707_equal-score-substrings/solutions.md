# Solutions — Equal Score Substrings

## Running prefix against the total

A split is fully described by how many characters the left side owns: every
non-empty proper prefix of s is a legal left half, and the right half is
whatever remains. So score the whole string once, then sweep the split
points left to right while adding each character that crosses over to a
running left-side score. After the character at index i joins, the running
score is exactly the score of s[0..i], and the right side carries the rest
of the total — the two halves balance precisely when that running score has
reached half the total. Comparing twice the running score against the total
keeps the check in integers and never needs a second pass for the right
side.

The sweep stops before the final character, so neither half can come up
empty, and the length bound of two guarantees at least one split exists to
examine. An odd total can never halve, and those strings fall straight out
of the integer comparison as false; the earliest balancing split returns
true immediately. With at most 100 letters worth at most 26 points each,
every quantity involved stays below 2600 — far inside any fixed-width
integer.

**Complexity:** `O(n)` time, `O(1)` space.
