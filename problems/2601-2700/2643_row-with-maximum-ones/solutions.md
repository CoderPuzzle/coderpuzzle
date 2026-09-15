# Solutions — Row With Maximum Ones

## Single scan with strict-improvement tie-break

The selection rule ("maximum count, smallest index among ties") folds
directly into one comparison if the incumbent is only replaced by a strictly
greater count: rows arrive in increasing index order, so the first row to
reach a given winning count is the one that keeps the crown, and every later
row with an equal count fails the strict test. The answer pair is therefore
produced while counting — no second pass, no per-row storage, no separate
tie-break phase.

Counting itself is a plain accumulate-and-compare against 1; it never needs
sorting, prefix tricks, or random access. Each cell is read exactly once and
each row updates two scalars, so work is proportional to the matrix size with
constant auxiliary space regardless of how ones are distributed.

Bounds are friendly everywhere: counts never exceed `n <= 100` and indexes
never exceed `m - 1 <= 99`, so a couple of ints per language hold everything.
Starting the best count at `-1` (rather than `0`) makes the very first row's
update unconditional, which also settles the all-zeros matrix on row 0 by the
same strict rule.

**Complexity:** `O(m * n)` time, `O(1)` extra space beyond the two-element
answer.
