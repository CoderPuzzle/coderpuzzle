# Solutions — Number of Distinct Substrings in a String

Counting substrings directly means deciding which occurrences spell the same
string, and the suffix automaton settles that by construction: it is the
minimal automaton whose states are exactly the equivalence classes of
substrings by set of ending positions, so the distinct substrings partition
into states and each state owns one known, contiguous range of lengths. One
linear build, then a sum of range widths — no hashing, no comparisons, no
collisions.

## Suffix automaton, one class per state

Build the automaton of `s` online, one character at a time. Every state `v`
carries `len[v]`, the longest substring it represents, and `link[v]`, a
suffix link to the state for the longest proper suffix of that substring
whose ending positions differ from `v`'s. A state then represents exactly
the substrings whose lengths fill the half-open interval
`(len[link[v]], len[v]]` — `len[v] - len[link[v]]` of them — and two
substrings are equal precisely when they land in the same state. So the
answer is the sum of `len[v] - len[link[v]]` over every non-root state:
on `aabbaba` that sum is the 21 substrings the statement enumerates, and on
`abcdefg`, where nothing repeats, every class holds a single substring and
the sum is the triangular number `7 * 8 / 2 = 28`.

Appending a character `c` from `last`, the state of the whole prefix so
far, creates a fresh state `cur` for the new longest suffix, then walks the
suffix-link chain from `last` adding a `c`-transition to `cur` wherever
none exists. If the walk stops at a state `p` that already has `c` leading
to `q`, then either `q` is shallow enough (`len[p] + 1 == len[q]`) to serve
as `cur`'s link, or `q` must be split: a clone of `q` truncated to depth
`len[p] + 1` takes over `q`'s transitions and link, the remaining `q`
transitions on the walk redirect to the clone, and both `q` and `cur` link
to it. The clone is an ordinary state contributing its own interval, which
is exactly what keeps the classes disjoint and the counting identity exact.

This answers the follow-up affirmatively: each extension performs two
upward walks on the link tree, and both start no lower than where the
previous extension's walks ended, so their total length over the whole
build is linear in `n` — the automaton needs at most `2n - 1` states and
is constructed in `O(n)` steps for a fixed alphabet. Storing transitions
as a dense 26-wide table per state makes the whole run `O(26n)` time and
`O(26n)` space — about 26,000 integers at `n = 500` — with no random
ingredient anywhere, so unlike the hashing route the count is exact by
construction.

**Complexity:** `O(26n)` time, `O(26n)` space.
