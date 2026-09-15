# Solutions — Palindrome Rearrangement Queries

## Prefix letter counts and mirrored mismatch bookkeeping

Think of the string as `n / 2` mirrored pairs `(x, n-1-x)`. A query touches a
pair in one of four ways: both sides stay fixed (the pair must already
match), only the left character is rearranged (the left pool must supply the
fixed right character), only the right character is rearranged
(symmetrically), or both (the pair is flexible). Characters never cross the
middle, so the query succeeds exactly when every fixed pair already matches,
each interval's multiset covers the fixed characters facing it, and the two
unconsumed remainders are equal letter by letter — then each flexible pair
takes one equal character from either side.

Two prefix tables answer all of that per query. A letter-count prefix gives
the multiset of any range in `O(26)`, and a mismatch prefix — over pairs
whose characters differ — checks the fully fixed pairs by range sums. The
fixed characters facing a covered interval are the mirror interval minus the
other query interval, so subtracting two ranges (at most two pieces each)
names them. The two mirrors `[n-1-b, n-1-a]` and `[n-1-d, n-1-c]` decide the
geometry; the piece arithmetic is the same whether they sit inside, outside,
or straddling the query intervals. (The Python reference packs the 26 letter
counts into 20-bit fields of one big integer so the balance test is a single
arithmetic comparison.)

**Complexity:** `O(26 · (n + q))` time, `O(26 · n)` space.
