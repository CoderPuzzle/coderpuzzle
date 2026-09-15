# Solutions — Count Prefixes of a Given String

## Single linear scan with a startswith test

A `word` is a prefix of `s` precisely when `s` begins with `word`, which every
language's standard library exposes directly (`s.startswith(word)`,
`word == s.substr(0, word.length)`, `s.rfind(word) == 0`, and so on). Since the
answer is a plain count, the whole problem is one pass over `words`: for each
`word`, test whether it is a prefix of `s` and add one to the running total when
it is.

The subtlety is only that `word` may be longer than `s`. The standard prefix
test handles that natively — a string can never begin with a longer string — so
no length guard is needed. Duplicates in `words` each count separately, and an
empty comparison never arises because the constraints fix both `word` and `s`
to be non-empty.

Every word is touched exactly once and the prefix test costs `O(|word|)`, so the
work is linear in the total input. No auxiliary storage is used.

**Complexity:** `O(Σ|wordᵢ|)` time (each word is compared once), `O(1)` space.
