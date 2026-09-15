# Solutions — Longest Palindrome After Substring Concatenation I

## Brute-force substring enumeration

The strings are tiny (at most 30 characters each), so every pair of
substrings can be inspected directly. A concatenation `s[i..i2] + t[j..j2]`
is a palindrome exactly when the shorter side mirrors the longer one —
`s[i + k] == t[j2 - k]` for every `k` up to the shorter length — and the
leftover piece on the longer side is itself a palindrome. That leftover is
either a suffix of the `s`-part or a prefix of the `t`-part, so two boolean
tables `palS` / `palT` (built with the classic interval recurrence) answer it
in constant time.

Because either substring may be empty, the palindrome may live entirely
inside `s` or entirely inside `t`. The two tables also cover those cases:
the running maximum over all palindromic substrings found while filling them
seeds the answer before any crossing pair is considered.

The enumeration prunes with the current best length — any pair whose combined
length cannot beat it is skipped before the mirror scan — which keeps the
all-same-character extremes (where the true answer is found early) near
instant. With `n, m <= 30`, the full four-level scan over substring pairs
remains the dominant cost, and the mirror loop is at most `min(n, m)` steps.

**Complexity:** `O(n² · m² · min(n, m))` time, `O(n² + m²)` space.
