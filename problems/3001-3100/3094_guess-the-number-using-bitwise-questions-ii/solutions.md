# Solutions — Guess the Number Using Bitwise Questions II

## Bit-by-bit probes against a zero baseline

Call `commonBits(0)` once and keep the result as `base`. Querying `0`
agrees with the hidden number exactly where its low 30 bits are zero, so
`base` counts those zeros — and because XOR with `0` changes nothing, the
state is untouched afterward. Now probe each power of two. While the
number is whole, `commonBits(2^i)` agrees with `2^i` at position `i` only
if bit `i` of `n` is set, and at every other position only where `n` has a
zero; so a set bit pushes the answer to `base + 1` while a clear bit pulls
it to `base - 1`. Comparing each single-bit probe with `base` therefore
reads out one bit of the initial value.

Each probe flips the probed bit in the state (`n = n XOR num`), so after
the comparison the mask must be asked once more: XOR-ing with the same
number reverts the effect and restores the original value before the next
probe (hints 4 and 5). With thirty one-bit probes plus the baseline query,
the procedure uses 61 calls in total.

**Complexity:** `O(30)` queries = `O(1)` time (61 calls), `O(1)` space.
