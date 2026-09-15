# Solutions — Remove Digit From Number to Maximize Result

## Try every occurrence, keep the largest string

Exactly one occurrence of the digit must go, and removing different
occurrences can only be compared by their results, so the direct route is
to generate each candidate — the number with that one occurrence spliced
out — and keep the lexicographically largest. Numeric maximality and
string comparison agree here because every candidate has the same length.

**Complexity:** `O(n²)` time in the worst case (up to `n` candidates of
length `n - 1`), `O(n)` space.
