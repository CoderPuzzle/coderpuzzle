# Solutions — Find the Celebrity

## Elimination and Verification

The celebrity definition gives a two-outcome test between any two people A and B: if A knows B, then A cannot be the celebrity (a celebrity knows nobody); if A does not know B, then B cannot be the celebrity (everyone must know the celebrity). Either way, one `graph` lookup rules out exactly one person, so a single elimination pass over all `n` labels can discard `n - 1` of them in `n - 1` comparisons.

The pass keeps one live `candidate`, starting at 0: for each other person `i`, if the candidate knows `i`, the candidate is eliminated and `i` takes over; otherwise `i` is eliminated on the spot and the candidate survives. Every person other than the final candidate was discarded by a direct violation (they know somebody, or the then-candidate did not know them), so the final candidate is the _only_ person who could possibly be the celebrity — nobody else needs a second look.

"Could possibly" is not "is": the candidate was never checked against people eliminated after they left the picture, and eliminated people were never checked against the candidate either. A verification pass therefore confirms the definition for the candidate alone — the candidate's entire row must be 0 (knows nobody, skipping the self-entry that is always 1) and the candidate's entire column must be 1 (known by everyone) — returning `-1` on the first violation. The two passes each do O(n) matrix reads with two index variables; in the classic `knows(a, b)` API framing this totals at most about `3n` calls.

**Complexity:** `O(n)` time, `O(1)` space.
