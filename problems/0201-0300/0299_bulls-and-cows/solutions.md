# Solutions — Bulls and Cows

## Two count arrays, one pass

A digit scores a bull when it sits at the same position in both strings, so
one walk compares position by position and tallies the matches directly.
Every digit at a mismatching position instead drops into one of two 10-slot
counters, one per side: each leftover digit of `secret` bumps its slot in
the first counter, each leftover digit of `guess` its slot in the second.
When the walk ends, slot `d` of a counter says how many copies of `d` that
side still has in play.

The cows are the overlap of the two leftovers. A leftover guess digit can
only be rearranged into a bull if the secret supplies a leftover partner, so
each digit contributes exactly `min(secret_left[d], guess_left[d])` cows.
That min is the duplicate rule from Example 2 made mechanical: when the
guess carries more copies of a digit than the secret has left — the two
unmatched 1s against a single remaining secret 1 — the surplus copies simply
die rather than score. Counting only mismatching positions is also what lets
bulls take precedence: an exact match consumes one copy of the digit on both
sides before the cow pools are ever formed.

The hint is then just the two tallies formatted as `"xAyB"`. Both strings
are walked once, and the counters never grow past ten slots regardless of
input length.

**Complexity:** `O(n)` time, `O(1)` space.
