# Solutions — Phone Number Prefix

## Sort and Check Adjacent Numbers

Sorting brings every prefix relationship to the surface between
neighbors. If `x` is a prefix of `y`, then `x` sorts before `y`, and
any string landing between them in sorted order must also start with
`x` — at the first position where such a middle string disagreed with
`x`, it would compare either below `x` or above `y`, contradicting
where it sits. So after sorting, checking each adjacent pair with a
`startsWith` test finds a violation iff one exists anywhere; equal
duplicates are caught too, since a string starts with itself.

One linear pass of `n - 1` neighbor tests follows the sort. Each test
compares at most `min(len(a), len(b))` characters, so with `L` the
longest phone number length the sweep is `O(n · L)`.

**Complexity:** `O(n log n · L)` time, `O(n)` space for the sorted
copy.
