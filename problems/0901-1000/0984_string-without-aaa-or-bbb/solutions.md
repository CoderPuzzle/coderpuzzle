# Solutions — String Without AAA or BBB

The conditions only cap how long a run of equal letters may grow — at two — so
the whole task is spending the larger count fast enough that it never forms a
third in a row. The pinned answer does exactly that greedily: while the larger
count strictly exceeds the smaller and the smaller has not run out, each step
consumes two of the larger letter and one of the smaller; the counts then
alternate one-for-one to the end.

## Double steps, then pairs

Name the letter with the larger count `big` (a tie makes `'a'` big) with `big`
copies left and the other `small` with `small` copies left. While
`big > small` and `small > 0`, append two `big` letters then one `small`
letter. Each such step lowers the gap `big - small` by exactly one — `big`
loses 2, `small` loses 1 — and a gap shrinking by one cannot skip past zero,
so the phase ends precisely when the two counts become equal, or earlier when
`small` reaches 0. The step also preserves the guarantee's shape
`big <= 2 * small + 2`: subtracting 2 from the left side and 1 from `small`
leaves `big - 2 <= 2 * (small - 1) + 2`. That preserved cap is what bounds the
endgame — if `small` hits 0 mid-phase, `big` is at most 2.

Once the first phase ends, a single closing loop appends one `big` letter if
any remain, then one `small` letter if any remain, until both counts reach 0.
When the phase ended at equality the loop emits `big`-`small` pairs, and equal
counts hit zero together; when it ended at `small == 0` only the one or two
trailing `big` letters remain to append. The same loop handles the one-sided
inputs — for `(2, 0)` both guards fail up front and it emits `aa` directly.
Exact totals need no separate argument: every appended letter is decremented
from its own counter, so the output holds exactly the surviving copies of each
letter and has length `a + b`.

No run ever reaches three. Inside the first phase each appended block is two
`big` letters closed by a `small` one, and consecutive blocks meet small-to-
big, so `big` runs stop at two and `small` runs at one. The closing loop
strictly alternates — or, when only `big` letters remain, appends at most the
two the preserved cap allows — and its first letter follows a `small` or
starts the string. So neither `aaa` nor `bbb` ever occurs.

**Complexity:** `O(a + b)` time, `O(a + b)` space.
