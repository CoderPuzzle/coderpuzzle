# Solutions — Count Substrings Without Repeating Character

## Last-seen sliding window

A substring is special exactly when its characters are all distinct, so
for each right endpoint `i` there is a smallest left endpoint `L(i)` such
that `s[L(i)..i]` contains no repeating character: every start to the left
of `L(i)` yields a substring with a repeat, and every start from `L(i)`
through `i` yields a special one. The number of special substrings ending
at `i` is therefore `i - L(i) + 1`, and summing that over all endpoints
counts every special substring exactly once, grouped by where it ends. `L`
never moves backwards: a window that is duplicate-free stays duplicate-free
when it grows, unless the newly arrived character itself duplicates a copy
already inside the window — so `L(i)` is either `L(i-1)` or the position
just past the previous occurrence of `s[i]`, whichever is larger.

Remembering `last[c]`, the most recent index of each character `c`, turns
that recurrence into a single sweep. Arriving at index `i` with
`c = s[i]`, raise the window start to `max(L, last[c] + 1)`, add
`i - L + 1` to the answer, then record `last[c] = i`. The max is what makes
stale entries harmless: an occurrence that lies before the current window
satisfies `last[c] + 1 <= L` and leaves the window untouched, so no set
membership test or eviction loop is ever needed — the window start only
jumps forward. Edge cases fall out of the arithmetic: a single-character
string contributes 1; an all-same string keeps the start pinned just past
the previous copy, so every endpoint contributes exactly 1 and the answer
is `n`; and since the alphabet has 26 lowercase letters, no window can be
longer than 26, bounding every contribution.

In the fixed-width languages the running total is carried in a 64-bit
integer so the accumulation never depends on how large the count can grow.

**Complexity:** `O(n)` time, `O(1)` space (`last` holds one entry per
lowercase letter).
