# Solutions — Wildcard Matching

## Greedy two pointers, one remembered star

Two pointers walk `s` and `p` together. An ordinary character or `'?'` consumes one position of each; a `'*'` is provisionally matched to the empty sequence — the code records where the star sits in `p` and where `s` stood, then steps past it. When the pointers later disagree, the match does not fail as long as a star is on record: the most recent star absorbs one more character of `s`, and the pattern replays from just after that star. Each replay permanently consumes one character of `s`, so the string pointer never rewinds past its last retry point.

Remembering only the latest star is what keeps this correct rather than merely fast: when a replay fails again, retrying the newer star subsumes every retry of an older one, because both would extend the matched prefix of `s` by one character while the newer star sits further along in `p`. Once `s` is exhausted the pattern can still succeed only through trailing stars, so the method skips any remaining `'*'` characters and returns whether the pattern is consumed as well. Four integers of state carry the entire algorithm — no recursion, no table.

**Complexity:** `O(n · m)` time in the worst case — at most `n` backtracks, each rescanning at most `m` pattern characters — but near-linear on typical inputs; `O(1)` extra space.
