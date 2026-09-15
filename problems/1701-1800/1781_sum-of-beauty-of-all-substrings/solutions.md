# Solutions — Sum of Beauty of All Substrings

A substring's beauty only compares the frequencies of the characters it
actually contains, so one count array over the alphabet holds everything
needed — and growing a substring by one character touches exactly one
counter.

## Grow every substring over a running count array

Anchor a start index `i` and walk the end `j` rightward, maintaining a
26-slot frequency array for the substring `s[i..j]`. Adding `s[j]` bumps
a single counter, and the substring's beauty is that array's largest
counter minus its smallest nonzero one; add the difference to the
running total before the next extension. Each start index begins with a
fresh array, so all `n * (n + 1) / 2` substrings are scored exactly
once. Uniform and single-character substrings score zero automatically:
their nonzero counters are all equal, so max and min coincide.

With `n <= 500` the double loop scans counters about 3.3 million times,
comfortably inside the limits in every language, and the accumulated
total is bounded by roughly 2.1 * 10^7 — far below 32-bit overflow.

**Complexity:** `O(n^2 * 26)` time, `O(26)` space.
