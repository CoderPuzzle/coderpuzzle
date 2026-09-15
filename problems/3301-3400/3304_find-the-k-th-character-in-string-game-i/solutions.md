# Solutions — Find the K-th Character in String Game I

## Simulate the doubling word

The construction is its own algorithm. Start from `"a"` and keep applying
the operation: each pass appends a copy of the current `word` with every
letter moved to its next character, so the length doubles every time — 1,
2, 4, 8, … After at most nine passes the word is longer than any `k` the
constraints allow, because 2⁹ = 512 already exceeds 500.

The simulation stops as soon as `word` has reached length `k`, and the
answer is simply the character sitting at index `k - 1`. No search or
bookkeeping is needed beyond tracking where the last append began: since
the operation never changes the characters already placed, positions in
the final word are fixed the moment they are first written. Tracing
Example 1 by hand shows the same thing — `"a"` becomes `"ab"`, then
`"abbc"`, then `"abbcbccd"`, whose fifth character is `'b'`.

Each pass touches every character exactly once, so the total work is
proportional to the final length, which is bounded by twice `k`. The word
itself is the only storage, of that same bounded size.

**Complexity:** `O(k)` time, `O(k)` space.
