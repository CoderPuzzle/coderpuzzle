# Solutions — Lexicographically Smallest String After Reverse

## Enumerate every one-operation outcome

One operation is fully described by a length `k` and an end: flip the first
`k` characters or flip the last `k`. That fixes the whole search space — at
most `2n - 1` distinct outcomes — so the smallest reachable string is simply
the minimum over all of them under ordinary dictionary order. Reversing a
single character changes nothing, so `s` itself always sits in that space and
can seed the running minimum; every other candidate comes from some `k >= 2`.

Building one candidate costs `O(n)`: copy `s`, reverse just the chosen
stretch, compare against the best so far. Flipping the first `k` characters
leaves positions `k..n-1` untouched; flipping the last `k` leaves
`0..n-k-1` untouched — either way it is one copy plus one partial reversal,
never a from-scratch reconstruction. With `n <= 1000` the full sweep writes
about two million characters, comfortably fast, and no reasoning about which
`k` might win is ever needed.

Ties cost nothing: several operations often land on the same minimal string
(repeated letters, palindromic stretches), but the running minimum is a value
rather than a choice of move, so any of them reaching it produces the
identical answer.

**Complexity:** `O(n²)` time, `O(n)` space.
