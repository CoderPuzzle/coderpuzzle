# Solutions — Find the Sequence of Strings Appeared on the Screen

There is no choice to optimize: key 2 does nothing on an empty screen, so
every position must begin with key 1, and once the wanted character's
position exists, advancing it from `'a'` to the target character is the
only way to finish it. That fixed recipe is also minimal per key, and it
determines the entire sequence of screen states — the task is just to play
the recipe back.

## Type the forced recipe, emit every state

Simulate the typing directly. Keep the current screen as a growable
string; for each character `c` of `target`, append `'a'` (key 1), record
the screen, then advance the last character `c - 'a'` times (key 2),
recording the screen after every advance. Each recorded state lands in the
output list in the order it appears. Every state differs from the previous
one in exactly one character, and the total number of states is
`Σ (cᵢ - 'a' + 1)` — at most `26·n` for `n = 400`, about ten thousand
strings of up to 400 characters each.

Because the screen only ever grows and, at a fixed length, its last
character only moves forward, no state can ever repeat; the ordering is
chronological by construction. Output volume dominates the cost: each of
the `O(n)` positions copies the screen of length `O(n)` up to `26` times,
so the run is linear in the output size itself, which is `Θ(n²)`
characters at the `n = 400` bound (about 2 MB for an all-`'z'` target).

**Complexity:** `O(n²)` time (linear in the output size), `O(n²)` space
for the emitted states, `O(n)` auxiliary.
