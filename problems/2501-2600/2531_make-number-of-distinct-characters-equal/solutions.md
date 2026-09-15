# Solutions — Make Number of Distinct Characters Equal

A move exchanges exactly one letter between the two words, so no matter
which indices are chosen the only thing that matters is which letter leaves
`word1` and which letter enters it — the words are multisets as far as the
distinct count is concerned. Any index holding the leaving letter works, so
the space of different moves has at most 26 × 26 shapes, indexed by an
ordered pair `(a, b)`.

## Frequency arrays over all letter pairs

Count the 26 bucket frequencies of each word once and record their distinct
counts `n1` and `n2`. Then try every ordered pair: letter `a` present in
`word1` is swapped for letter `b` present in `word2`. When `a == b` the two
words trade identical letters, so both counts stay put and the pair answers
exactly when `n1` and `n2` already agree; otherwise `word1`'s new distinct
count is `n1 − (c1[a] = 1) + (c1[b] = 0)` — it loses a letter only if that
was its last occurrence, and gains one only if `b` was absent — and
symmetrically for `word2`. The answer is `true` iff some pair equalizes the
two formulas.

Because every candidate is checked in constant time after the O(n) counting
pass, strings of length 10⁵ cost nothing beyond reading them, and the
26 × 26 loop dominates with a fixed ~676 iterations.

**Complexity:** `O(n₁ + n₂)` time (plus a constant 676-pair sweep), `O(1)`
space.
