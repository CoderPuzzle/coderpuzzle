# Solutions — Unique Substrings With Equal Digit Frequency

## Extend from every start with a running equal-frequency check

There are only `O(n²)` substrings, so the plan is to visit every substring
once from each of its possible start indices and extend it one character at
a time. While extending, maintain the count of every digit together with
two aggregates: how many distinct digits have appeared (`distinct`) and the
largest per-digit frequency (`max_count`). The substring has an
equal-frequency composition exactly when `max_count * distinct` equals its
length — if every digit occurs `max_count` times over `distinct` digits,
the length must be that product, and conversely no other split of the
length works.

Passing that test does not mean the substring is new: `"12"` occurs twice
in `"1212"` but counts once. A set of substrings absorbs the duplicates,
and each accepted extension inserts its current text into the set; the
answer is the final set size. Building each candidate incrementally keeps
the per-extension cost constant apart from the insertion.

Every `(start, end)` pair is touched once with `O(1)` bookkeeping plus a
set insert whose cost is the substring's own length — at most quadratic
work overall on a string of a thousand digits.

**Complexity:** `O(n²)` time (amortized, up to substring-length hashing),
`O(n²)` space for the stored substrings.
