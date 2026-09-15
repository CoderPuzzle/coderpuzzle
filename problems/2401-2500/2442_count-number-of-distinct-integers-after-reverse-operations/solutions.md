# Solutions — Count Number of Distinct Integers After Reverse Operations

## Values and Reversals Set

The operation never rewrites the array — it only appends one reversal per
original — so the final multiset is exactly "the originals" plus "the
reversals", and its distinct values are the union of the two sets. That
observation removes any need to materialize a `2n`-length array: insert
every original into a hash set, then every reversal, and the set's size is
the answer. Duplicates across and within the two groups collapse for free.

Reversal is digit work on a value that has at most six digits. Reversing
never grows the digit count, so every reversal stays at or below `10⁶` and
32-bit integers hold everything; the intermediate accumulator in the
arithmetic loop peaks at the final reversed value, well inside range.
Leading zeros are the classic trap: `10` must reverse to `1`, not to some
two-digit artifact. The arithmetic form handles this without special cases
— building `0 * 10 + 0` first simply contributes nothing.

The set does the deduplication both within each group (repeated originals,
or several values reversing to the same number, like `12` and `21`) and
across them (palindromes such as `999999` land in their own group already).

**Complexity:** `O(n · d)` time where `d <= 7` is the digit count, `O(n)`
space for the set.
