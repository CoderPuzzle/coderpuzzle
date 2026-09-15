# Solutions — Freedom Trail

## DP over Ring Positions

The only state that matters between spelling characters is which ring index currently sits at 12:00, so the solution runs a DP whose layer is a map from aligned ring index to the minimum rotation steps spent so far. It begins with `{0: 0}` — the ring starts with index 0 aligned — and precomputes `positions[ch]`, the indices where each character occurs, so each stage only ever considers alignments that actually spell the current key character.

The transition between layers prices a rotation correctly on a circle: moving the aligned index from `i` to `j` costs `min(abs(i - j), n - abs(i - j))` rotations, going the shorter of clockwise and counterclockwise. For each occurrence `j` of the next key character, the new cost is the minimum of `dp[i] + rotation cost` over every previous alignment `i`; the layers stay small because only positions of relevant characters survive, though in the worst case every ring index carries the character.

After the last key character the answer is the cheapest final alignment plus one button press per key character — `len(key)` presses in total, added once at the end rather than per step. The guarantee that `key` can always be spelled means `positions[ch]` is never empty, and the first stage is just the special case of rotating from index 0 (which may cost zero if the character already sits at 12:00). With `k = len(key)` and `r = len(ring)`, each of the `k` stages pairs at most `r` targets with at most `r` sources.

**Complexity:** `O(k·r^2)` time, `O(r)` space.
