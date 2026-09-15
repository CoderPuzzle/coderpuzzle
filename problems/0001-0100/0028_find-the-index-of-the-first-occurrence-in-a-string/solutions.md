# Solutions — Find the Index of the First Occurrence in a String

## Knuth–Morris–Pratt scan

A naive scan slides the needle along the haystack and restarts the comparison from its first character after every mismatch. On adversarial inputs — a needle like `aaab` against a long run of `a` — almost every offset matches almost the whole needle before failing, and the work becomes quadratic. The waste is avoidable because the characters that did match are themselves a prefix of the needle, and how much of each prefix of the needle can survive as a suffix is a property of the needle alone, computable up front.

That is the `lps` table the method builds first: `lps[i]` is the length of the longest proper prefix of `needle[:i + 1]` that is also a suffix of it. The scan then walks `haystack` once, keeping `k`, the number of needle characters currently matched ending at the current position. On a mismatch `k` does not collapse to zero but falls back to `lps[k - 1]` — the tail of the matched window that is also a needle prefix stays matched — and on `k == m` the match ends at the current index, so the answer is `i - m + 1`. An empty needle occurs at every index by convention, so it returns 0 immediately; a completed pass with no full match returns -1.

Both phases are linear: `k` increases at most once per character examined and every fallback strictly decreases it, so the total number of fallbacks can never exceed the total number of increases.

**Complexity:** `O(n + m)` time, `O(m)` space.
