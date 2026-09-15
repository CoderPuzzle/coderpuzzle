# Solutions — Minimum String Length After Balanced Removals

## Counting the letter surplus

Every operation deletes a substring holding equally many `'a'` and `'b'`, so
each operation lowers both counts by the same amount and the difference
`count_a - count_b` is an invariant of the entire process. The final string,
whatever shape it takes, therefore still exhibits that same difference, and a
string whose counts differ by `d` must contain at least `|d|` characters —
every surviving letter moves the difference by exactly one. So `|d|` bounds
from below the length of everything the operations can reach.

The bound is attainable. While the current string contains both letters, some
adjacent pair differs — if every neighboring pair matched, the string would be
one unbroken run of a single letter. Such a pair `"ab"` or `"ba"` is itself
balanced, so deleting it is a legal operation, and it shrinks both counts by
one. Each deletion concatenates the surrounding pieces, which can create new
differing adjacencies elsewhere, but the argument never needs more than the
string at hand: as long as both letters survive, another deletable pair
exists. When one count finally reaches zero, the remainder is a single-letter
run whose length is exactly `|count_a - count_b|`.

The whole question therefore collapses to counting: scan `s` once, tally the
two letters, and return the absolute value of their difference. Simulating
the removals is never necessary, which is what keeps the largest inputs
comfortable.

**Complexity:** `O(n)` time, `O(1)` space.
