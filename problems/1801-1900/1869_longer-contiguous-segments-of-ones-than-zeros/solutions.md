# Solutions — Longer Contiguous Segments of Ones than Zeros

The naive reading of this problem checks every segment of equal
characters explicitly, which is quadratic in the string length and easy
to get wrong at the boundaries where a segment is absent. A single pass
does better: keep the length of the run of the current character, reset
it whenever the character changes, and record the best run seen for each
of `0` and `1` separately. A character that never appears simply keeps
its best length at 0, which is exactly the rule the statement asks for.

## Single pass with running counts

Scan the string once, maintaining `cur`, the length of the current run
of equal characters. When the next character equals the previous one,
increment `cur`; otherwise fold `cur` into the best counter for the
previous character and restart it at 1 for the new one. At the end fold
the final run too. The answer is `best_ones > best_zeros`.

Because both counters only grow to the string length, a character that
never occurs leaves its counter at 0, so strings like `"111"` or `"000"`
are handled without special cases: a segment of length 0 can never beat
a segment of positive length, and two absent characters tie at 0 (the
comparison is strict, so that also returns false).

**Complexity:** `O(n)` time, `O(1)` space.
