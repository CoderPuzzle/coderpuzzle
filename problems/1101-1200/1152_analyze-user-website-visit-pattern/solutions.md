# Solutions — Analyze User Website Visit Pattern

## Per-user 3-subsequences accumulated into a pattern-to-users map

The visits must be replayed in time order per person, so the first step
groups the tuples by user and sorts each user's list by timestamp. A pattern
counts a user once no matter how many ways the user realizes it, so the
accumulator maps each pattern to a **set** of users — a pattern generated
twice by the same user writes the same set entry and cannot inflate the
score.

Enumerating every 3-element subsequence of a user's ordered website list
(i < j < k, contiguous or not) produces exactly the patterns that user
realizes; with at most 50 visits that is at most `C(50, 3) ≈ 19 600`
triples per user. The final scan picks the pattern with the largest set,
replacing the leader on equal score only when the candidate compares
lexicographically smaller — the statement's tie rule. Because ties are
resolved during the scan, no secondary sort of all patterns is needed.

**Complexity:** `O(Σ C(mᵤ, 3))` time over per-user visit counts `mᵤ` —
bounded by ~19 600 triples per user with the constraint `n <= 50` — and the
same order of space for the pattern map.
