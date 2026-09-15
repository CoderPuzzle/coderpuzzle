# Solutions — Minimum Number of Valid Strings to Form Target II

## Aho-Corasick reach, forward DP over a min segment tree

Let `dp[p]` be the minimum number of valid strings that concatenate to
`target[:p]`, with `dp[0] = 0`; the answer is `dp[len(target)]` or `-1` if it
stayed unreachable. A piece ending at position `p` can have any length up to
the longest word-prefix suffix of `target[:p]`, and an Aho-Corasick automaton
over `words` supplies exactly that length: walking `target` once, the state
after reading index `j` lies on a trie path whose depth is the longest suffix
of `target[:j + 1]` that is a prefix of some word. If a character cannot extend
any such suffix — the walk falls to the root with no outgoing edge — no piece
can ever cover that position and the whole tail is dead, so the scan stops with
`-1`.

With reach `r >= 1` known for the piece ending at `j + 1`, its start may be any
position in `[j + 1 - r, j]`, so `dp[j + 1] = 1 + min dp[s]` over that window.
A basic min segment tree holding the finalized dp cells answers each window in
`O(log n)` with a range query and registers each newly computed cell with a
point update; dp values are written exactly once, in increasing order of their
position. Greedy longest-jump fails here (a long early piece can strand a
character only shorter pieces could cover), which is why the full window
minimum is needed.

Everything stays comfortably in 32-bit room: positions are at most `5 * 10⁴`,
and the answer can never exceed `len(target) <= 5 * 10⁴` pieces.

**Complexity:** `O(len(target) + sum(words))` automaton work plus
`O(len(target) · log len(target))` for the DP sweep, `O(sum(words))` space.
