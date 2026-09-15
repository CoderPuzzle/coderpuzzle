# Solutions — Minimum Window Subsequence

A minimum window must open on `s2[0]`: if its first matched character sat
deeper inside, cutting the window's head would leave a strictly shorter valid
window. So the search tries every opening of `s1` where `s2[0]` sits and, from
each, consumes the rest of `s2` as lazily as the text allows — which one
precomputed table serves in constant time per step.

## Next-occurrence table, greedy walk

Precompute `nxt[i][c]`, the smallest `j >= i` with `s1[j] == c`, for every
position `i` and letter `c`. A single backward sweep builds it: row `i` copies
row `i+1` and overwrites the one column of the character sitting at `i`, and
row `n` is all sentinels, so every failed jump lands on `n` and aborts the
walk. From each opening `i` — an index with `s1[i] == s2[0]` — the walk holds
`pos = i` and repeatedly jumps `pos = nxt[pos + 1][c]` through the rest of
`s2`. Taking the earliest continuation at every step is optimal for a fixed
opening: the earliest match for `s2[k]` leaves every later choice at least as
good, so the walk's landing index is the smallest right edge that opening can
have, and the window length is `pos - i + 1`.

Scanning openings left to right and recording a window only when it is
strictly shorter than the best so far keeps the left-most window among
equal-length winners, exactly as the statement demands; if `s2` never fits,
no walk completes and the empty string comes back. The scan can also stop the
moment the best length reaches `|s2|` — a window must contain `|s2|` matched
characters, so nothing shorter exists and a later tie cannot be left-most.

**Complexity:** `O(n·|Σ| + n·m)` time, `O(n·|Σ|)` space.
