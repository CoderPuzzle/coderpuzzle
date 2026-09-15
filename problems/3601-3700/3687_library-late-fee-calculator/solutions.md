# Solutions — Library Late Fee Calculator

## Tiered rate sweep

The fee is a step function of each book's late-day count, so every book is
handled independently: read its number of late days, decide which of the three
brackets it lands in — the flat one-day fine, the doubled rate for two through
five days, or the tripled rate beyond that — and add the result to a running
total. One pass over `daysLate` with a couple of comparisons per entry is the
whole algorithm; no book's bracket ever depends on another book's, so order of
visit and any grouping of the additions cannot change the sum.

The guard order mirrors the schedule's own wording: test equality with 1
first, then cap at 5, and let the tripled tier fall out as the plain `else`.
That keeps every branch mutually exclusive without restating the lower bounds
the previous guards already imply. Overflow never enters the picture either:
at most 100 books at most 100 days late each bound the answer by
100 * 300 = 30000, comfortably inside a 32-bit integer in all seven languages.

**Complexity:** `O(n)` time, `O(1)` space.
