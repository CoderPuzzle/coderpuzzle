# Solutions — Maximum Sum Score of Array

## One running prefix against the fixed total

The two sums at an index are not independent: the suffix
`nums[i] + … + nums[n-1]` is exactly the array total minus the prefix sum of
the first `i - 1` elements. Computing the total once, then walking the array
with a single running prefix, therefore exposes every index's score with one
addition per side — no stored prefix or suffix arrays needed.

Each step compares the just-updated prefix (the first `i + 1` elements)
against `total - prefix + nums[i]` (the last `n - i` elements) and keeps the
larger seen so far. The walk starts at index 0, where the two candidates are
`nums[0]` and the total, so a single-element array is covered without a
special case, and an all-negative array still reports the correct negative
maximum rather than zero.

Magnitudes bound the arithmetic honestly: every element is at most `10⁵` in
absolute value and there are up to `10⁵` elements, so both sums stay within
`10¹⁰`. That exceeds 32-bit range — fixed-width languages accumulate in
64-bit integers (`long` / `long long` / `int64_t` / `i64`) — while
JavaScript's plain numbers remain exact because `10¹⁰` sits far below the
`2⁵³` exact-integer ceiling.

**Complexity:** `O(n)` time, `O(1)` space.
