# Solutions — Find Kth Bit in Nth Binary String

## Peel levels instead of building the string

`S(n)` has length `2ⁿ - 1`, and its middle character — at position
`half = 2ⁿ⁻¹` — is always the literal `"1"` inserted by the recursive
rule; everything before it is `S(n-1)` unchanged, and everything after it
is `reverse(invert(S(n-1)))`. So instead of materializing the string, walk
down from `n` toward `1`: if `k` equals `half`, the answer is `"1"` (or
`"0"` if an odd number of inversions have accumulated on the way here); if
`k < half`, the bit lives at the same position inside the shorter `S(n-1)`
and nothing changes; if `k > half`, the bit lives inside the mirrored,
inverted copy, so its position inside `S(n-1)` is `2 * half - k` and one
more inversion needs to be remembered for the final answer.

The loop tracks only two things — the current `k` and a running `invert`
flag — and shrinks `n` by one each iteration, so it terminates after at
most `n` steps at `S(1) = "0"`, where the accumulated flag decides whether
the base bit flips. This is the same recursive structure as building
`S(n)` directly, just without ever allocating the string.

**Complexity:** `O(n)` time, `O(1)` space.
