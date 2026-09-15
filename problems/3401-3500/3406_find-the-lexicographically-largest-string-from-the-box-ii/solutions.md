# Solutions — Find the Lexicographically Largest String From the Box II

A split hands every friend a non-empty piece, so any piece leaves at least
`numFriends - 1` characters for the others: no piece can be longer than
`n - numFriends + 1`. Conversely, the largest substring under that cap can
always be completed to a full split by cutting single characters around it,
so the problem reduces to finding the largest substring of `word` whose
length is at most that cap.

## Largest-suffix duel, truncated to the cap

That largest capped substring starts at the same index as the
lexicographically largest suffix of `word`. Given the winning suffix start
`i`, the answer is `word[i : i + min(limit, n - i)]`: comparing against any
other substring, either the two differ inside the cap and the largest suffix
wins the comparison, or they agree past the cap, in which case the truncated
suffix is at least as long as any competitor that could beat it — a
competitor strictly longer would extend the winning suffix and contradict
its maximality.

To find that start, two candidate indices duel: `i` is the reigning
champion, `j` the challenger, and `k` the offset at which their suffixes
currently tie. When the characters first differ, the losing side is
discarded a whole block at a time — the tie means `word[i..i+k)` equals
`word[j..j+k)`, so each of the `k + 1` suffixes on the losing side is beaten
by the corresponding shifted suffix on the winning side, and the pointer
jumps past the entire tied block. Ties simply extend `k`. Each step either
extends the tie or advances `i` or `j` past positions that are provably
dominated, and no index is ever revisited, giving a single linear pass.
The `numFriends == 1` case has exactly one split — the whole word — and
returns it before the duel runs.

**Complexity:** `O(n)` time, `O(1)` extra space, where `n` is the length of
`word` (excluding the returned slice).
