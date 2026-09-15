# Solutions — Generate a String With Characters That Have Odd Counts

## Approach: One letter, plus a second only when needed

An odd count of one character suffices whenever `n` is odd: return `'a'`
repeated `n` times. When `n` is even, `n` copies of `'a'` would give an even
count, so emit `(n-1)` copies of `'a'` — an odd number since `n-1` is odd —
and finish with one `'b'`. Both constructions use only lowercase letters and
every letter that appears occurs an odd number of times.

**Complexity:** `O(n)` time and space for the output string.
