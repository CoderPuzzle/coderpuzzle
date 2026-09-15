# Solutions — Camelcase Matching

## Two pointers per query

Walk each query left to right with a second pointer into `pattern`.
Whenever the current query character equals the pattern character the
pointer is sitting on, advance both pointers — that character was matched
in place. Otherwise, if the query character is lowercase, it stands for an
inserted letter, so skip it and leave the pattern pointer where it is; but
if it is uppercase and does not match, no insertion can produce it, so the
query fails immediately. Once the query is exhausted, it matches only if
the pattern pointer reached the end of `pattern` (every pattern character
was consumed in order).

**Complexity:** `O(N)` time, `O(1)` space (excluding the output array),
where `N` is the sum of the lengths of all strings in `queries` — each
query is scanned once, and the pattern pointer advances at most as far as
the query does.
