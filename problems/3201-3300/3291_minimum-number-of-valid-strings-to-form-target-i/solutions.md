# Solutions — Minimum Number of Valid Strings to Form Target I

## Per-position reach from Z-functions, layered jump-game scan

Concatenating pieces left to right means every state is just an offset in
`target`, so let `dp[i]` be the fewest valid strings forming the prefix
`target[:i]`; position `i` can extend to any `j` with `target[i:j]` a prefix of
some word. The matching lengths are collected in one pass: for each word, a
single Z-function over `word + separator + target` reports, at every offset,
how many characters continue to match that word's own start — take the maximum
over words and `reach[i]` is the longest usable piece starting at `i`. With
`reach` fixed, the problem becomes a jump game: from position `i` you may jump
right by any length in `[1, reach[i]]`, and the answer is the fewest jumps to
cover all `n` characters.

The jump count falls out of a single layered frontier scan rather than explicit
range updates. Distances are monotone along `target` — every prefix of a valid
string is itself valid, so a cheaper way to reach an earlier offset never
appears later — which makes the dp layers contiguous index ranges, exactly the
structure the classic jump-game scan exploits: sweep ascending, fold each
position's `reach[i]` into the farthest frontier seen so far, and each time the
walk arrives at the current boundary, commit one more piece and move the
boundary to that frontier. Neither extreme policy substitutes for the fold:
always jumping the longest piece can strand a cheaper split further right, and
always jumping the shortest inflates the count — the minimum genuinely has to
consider every landing spot in the window, which is precisely what settling the
whole layer before advancing does. If a boundary arrives whose positions reach
nothing beyond it, some character can never begin a piece and the answer is
`-1`.

Every quantity fits comfortably in 32-bit room: offsets and match lengths never
exceed `5 * 10³`, and even a pathological one-character-per-piece target needs
at most `n <= 5000` pieces.

**Complexity:** `O(total(words) + len(words) · len(target))` time — the
Z-function of `word + separator + target` is linear in its length, so building
all reaches pays `len(target)` per word, plus one linear scan,
`O(len(target))` space beyond the per-word buffers.
