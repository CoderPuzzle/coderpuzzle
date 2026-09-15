# Solutions — Maximum Area of Longest Diagonal Rectangle

Every rectangle independently offers a diagonal and an area, and the
choice rule is a two-level key: longest diagonal first, largest area to
break ties. That makes the whole problem a single max-scan — no sorting,
no grouping, just the best key seen so far.

## Integer diagonal squares, one pass

The square root in the statement is presentation, not workload: square
root is strictly increasing on non-negative numbers, so ordering by
`length² + width²` orders the diagonals identically — and squared
diagonals are exact integers (at most `100² + 100² = 20000`), which
removes every floating-point rounding question the `sqrt` formulation
would raise. Comparing the two candidate rectangles of Example 1 as `90`
versus `100` is the entire computation behind its decimal diagonals.

The scan keeps a running champion keyed lexicographically on
`(diagonal², area)` and replaces it only on strict improvement, so the
first of several equally long, equally large rectangles is kept —
harmless, since they share the answer. Python compares the tuples
directly; the other languages spell out the two-level comparison. Areas
stay under `100 · 100 = 10⁴`, so plain machine integers carry everything.

**Complexity:** `O(n)` time, `O(1)` space.
