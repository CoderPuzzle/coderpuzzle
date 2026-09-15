# Solutions — Longest Valid Parentheses

Both methods organise the scan around one measurement: how far back the
balanced run ending at the current position reaches. The stack keeps that
run's boundaries on hand — still-open indices in order with a wall at the
bottom — so every closer reads its length straight off the top. The table
arrives at the same lengths by recurrence instead: each closer asks the run
ending just before it where its partner sits, and runs chain together with
no bookkeeping beyond the table itself.

## Index stack with a sentinel base

Keep a stack of indices, seeded with `-1` as a sentinel "base": the position just before the current candidate stretch. Scan the string once. The index of every `(` is pushed, so the stack always holds the still-unmatched opening brackets in order, with the base (or an unmatched `)` acting as the new base) sitting beneath them.

On a `)`, pop. If the pop empties the stack, this closer is unmatched — it can never sit inside a valid substring, so its own index becomes the new base, fencing off everything to its left. Otherwise the popped index was the `(` matching this `)`, and the top of the stack now names the closest barrier _before_ the valid stretch that ends here: `i - stack[-1]` is that stretch's full length, tracked against the best. Because interior barriers only disappear by being matched, adjacent valid stretches separated by a now-matched `(` automatically measure as one stretch — in `"()()"` the second match pops the `(` at index 2 and exposes the original `-1` base, yielding 4, not 2.

![For s = ")()())" the stack after each character: the base resets at the unmatched ")" characters, and the matches at i = 2 and i = 4 measure lengths 2 and 4.](figures/solution-stack-states.svg)

Edge cases fall out of the mechanics: the empty string never enters the loop (answer 0), leading `)` characters just keep resetting the base, and a string of only `(` leaves `best` at 0 since no closer ever pops anything. One pass with constant work per character decides the time; the stack is the only auxiliary structure and can hold up to `n` indices when the string is all opening brackets.

**Complexity:** `O(n)` time, `O(n)` space.

## Suffix run-length DP

The run ending at each position has a length, and that one column of lengths
is the whole apparatus — no stack, no walls, nothing maintained alongside
the scan. Let `dp[k]` hold the length of the balanced run ending at index
`k - 1`. Entry `0` grounds the table just off the front of the string, so
even the first character has a "run before it" of length zero to consult.
An opener writes nothing: no run ends on a `(`, so its entry stays zero.

A closer at `i` starts from its predecessor. The run ending at `i - 1` has
length `dp[i]`, so the index `i - 1 - dp[i]` sits immediately to that run's
left, and its occupant decides everything. A `(` there is not a candidate
but the partner — a `(` and a `)` with nothing but balanced material between
them is exactly what being matched means — so the run ending at `i` jumps
the pair: `dp[i + 1] = i - j + 1 + dp[j]`, the pair's own two brackets with
everything they enclose, plus whatever run ends just before the opener. Any
other reading — another `)` at that index, or no index at all because the
run before the closer already starts the string — leaves the closer
unmatched and its entry at zero. The answer is the largest entry the scan
ever writes.

The chaining is where lengths accumulate. In `"(()())"` the closer at
index 2 records 2, the closer at index 4 pairs with the opener at index 3
and adds the run of 2 that ended at index 2 for 4, and the closer at
index 5 sees its predecessor's run reach back to index 1, takes index 0 as
its partner, and records `5 - 0 + 1 = 6` in one step. In `"))(()()"` the
closer at index 4 records 2 and the closer at index 6 pairs with the opener
at index 5 while the run of 2 that ended at index 4 chains on beneath it
for 4; the leading closers never interfere because the one at index 1 finds
another `)` at its deciding index. `"((("` writes nothing but zeros, and an
empty string never enters the loop.

Each position costs a subtraction and, when it closes a pair, one write and
one comparison, and the table of one entry per position plus the grounding
zero is the only storage — the matching structure is recovered from the
table rather than kept beside it.

**Complexity:** `O(n)` time, `O(n)` space.
