# Solutions — Partition String Into Minimum Beautiful Substrings

## Suffix table over powers of five

Every beautiful piece is a power of five written in binary — with at most
fifteen bits, only `5⁰` through `5⁶ = 15625` qualify — so partitioning well is
purely a question of where to cut. `dp[i]` holds the minimum number of pieces
that cover the suffix `s[i:]`, filled right to left: the empty suffix costs
zero, and every other entry takes the best `dp[j] + 1` over the cut points `j`
whose prefix `s[i:j]` is itself beautiful. A longer first piece can strand a
remainder that cannot be split at all, so every cut point is tried rather than
just the longest or shortest piece.

A candidate prefix starts its check at the leftmost character: a `'0'` there
disqualifies it immediately, because leading zeros are never beautiful no
matter what value follows. From there the value is built incrementally as the
piece grows — multiply by two and add the next bit — so each extension is one
multiply-and-add instead of a re-parse, and the running value is tested with
the hint's division loop: divide by five while divisible, and an eventual
quotient of one certifies a power of five (a value like ten divides down to
two, not one). Entries no transition reaches stay at infinity, and that
unreachability propagates through the table; if `dp[0]` is still infinite when
the fill finishes, no partition exists and the answer is `-1`.

**Complexity:** `O(n²)` time, `O(n)` space.
