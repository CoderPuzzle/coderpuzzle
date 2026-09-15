# Solutions — Mirror Frequency Distance

## Tally each mirror pair once

Every character belongs to exactly one mirror pair, and the statement asks for
the sum over distinct pairs of the absolute frequency difference. The pairs
are fixed by the alphabet and the digit range: `a`–`z` folds into the 13
pairs `(a, z), (b, y), ..., (m, n)`, and `0`–`9` folds into the 5 pairs
`(0, 9), (1, 8), ..., (4, 5)`. A pair contributes only when at least one of
its two characters actually occurs, which the "counted only once" rule makes
equivalent to iterating these 18 pairs directly.

The first step is a frequency tally of the input. Because the alphabet is
small, a fixed-size array of 36 counters — 26 letters followed by 10 digits
— records every `freq(x)` in a single pass over `s`, with the character set
determining the index.

Then each of the 18 pairs contributes `|freq(c) - freq(m)|` exactly once
(when either side is nonzero), and the running sum is the answer. The
per-pair difference is at most `s.length`, and there are only 18 pairs, so
the total fits comfortably in a 32-bit integer.

**Complexity:** `O(n)` time, `O(1)` space.
