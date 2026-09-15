# Solutions — Minimum Deletions to Make String K-Special

## Fix the lowest kept frequency, sweep the bases

Deletion never raises a letter's count, so the finished word has some
letter sitting at its smallest final frequency `x`, and being k-special
pins every other kept letter into the window `[x, x + k]`. The cost of a
chosen `x` reads straight off the counts: a letter below the window can
never climb up to it, so it is cheapest to delete entirely; a letter above
the window sheds exactly its excess; a letter inside keeps everything. The
answer is the cheapest `x` over the 26 possible bases.

Only frequencies that already occur need to serve as `x`: the letter that
ends at the minimum never gives up any of its own occurrences (hint 2 —
trimming it would force every window letter down by the same amount or
more), so some letter keeps its original count, and that count is a valid
base. Sweeping the at-most-26 original counts against the at-most-26
letters is therefore exhaustive, a 26 × 26 double loop over a count array
built in one pass; with `n ≤ 10⁵` every total fits comfortably in 32-bit
arithmetic.

**Complexity:** `O(n + 26²)` time, `O(1)` space.
