# Solutions — Minimum Number of Operations to Make Array XOR Equal to K

An operation flips exactly one bit of one element. Since XOR aggregates
every element bit-position-wise, the only thing a flip can change about
the final array XOR is the single bit position it touches — so the
question reduces to comparing two bit patterns, not to reasoning about
the array element by element.

## Fold the XOR, then count differing bits

Let `X` be the XOR of all elements. Flipping bit `b` of any element
toggles bit `b` of `X` and leaves every other bit alone, so each
operation moves `X` one Hamming step: the bits where `X` and `k` differ
each need at least one flip (their parity is wrong until some flip
touches them), and one flip per differing bit also suffices — apply it to
any element, since the statement allows flipping even leading zero bits.
The answer is therefore exactly the popcount of `X XOR k`.

The implementation is one pass to fold `X`, then a popcount. With
`nums[i]` and `k` bounded by 10⁶, only the low 20 bit positions exist and
the answer is at most 20, so every language's native integer width is
comfortable — in particular JavaScript's `Number` handles the XOR and the
Kernighan-style bit-clearing loop exactly, with no rounding anywhere in
sight.

**Complexity:** `O(n)` time, `O(1)` space.
