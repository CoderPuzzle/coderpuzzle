# Solutions — First Matching Character From Both Ends

A direct reading walks every index `i` from 0 to `n - 1` and tests `s[i]`
against its mirror `s[n - 1 - i]`. That scan can stop well before the end:
as soon as `i` passes the middle, the pair `(i, n - 1 - i)` is exactly the
pair already tested at the mirrored index, so no new information is gained.

## Outward-in pair scan

The index `i` is compared with its mirror `n - 1 - i`. When the two
characters are equal, `i` is the answer — the scan starts at 0 and moves
outward only after failing every earlier index, so the first hit is
automatically the smallest matching index. Only indices 0 through
`(n + 1) / 2 - 1` need to be considered: at `i = (n - 1) / 2` for odd `n`
the two compared positions coincide, and that middle character always
equals itself, which is exactly why every odd-length string has at least
one answer.

For an even-length string every pair compares two distinct positions, so if
all of them differ the loop finishes without a hit and -1 is returned. The
whole test is a single pass over at most `n / 2` pairs with no extra
storage.

**Complexity:** `O(n)` time, `O(1)` space.
