# Solutions — 1-bit and 2-bit Characters

## One forced walk from the left

The character set decides everything before any scanning starts. A one-bit
character is exactly the single bit `0`, and both two-bit characters open
with a `1` — so the leading bit of any position names its character
outright: `bits[i] == 0` can only open the one-bit character, `bits[i] == 1`
can only open a two-bit character that consumes `bits[i + 1]` with it. No
position ever offers a choice, which is why the question's "must be"
collapses to a plain "is": the array decodes in exactly one way, and the
guaranteed trailing `0` ensures that walk always finishes — a `1` at the
last index cannot occur, so no character is ever left wanting a partner
bit.

So keep one index `i` marking where the next character starts, advance it
by the leading bit — two on a `1`, one on a `0` — and stop as soon as it
reaches the last index or passes it. Stopping exactly on the last index
means the final `0` opened the one-bit character right there, so every
decoding ends one-bit and the answer is `true`; overshooting to `n` means
the final character was the two-bit pair straddling that last `0`, and the
answer is `false`.

Example 1 `[1,0,0]`: the leading `1` opens `10`, the walk then stands on
index 2 — the last bit — and takes it as the one-bit character, so `true`.
Example 2 `[1,1,1,0]` decodes `11` then `10` and runs off the end at index
4, so `false`. The values being 0 and 1 is what lets a single equality
test drive every step, and the scan touches each bit once while carrying
nothing but the index.

**Complexity:** `O(n)` time, `O(1)` space.
