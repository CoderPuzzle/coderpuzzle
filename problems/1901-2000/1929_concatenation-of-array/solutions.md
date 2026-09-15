# Solutions — Concatenation of Array

## Build the doubled array directly

`ans` is fully determined by `nums`: the first half is a copy of `nums` and
the second half repeats it, so a single pass that writes each value at index
`i` and again at index `i + n` constructs the result in one sweep. Pre-sizing
the output avoids reallocation during the writes.

Every language offers a direct idiom — list concatenation in Python and
JavaScript, `extend`/spread in TypeScript, slice append in Go, `Vec` clone
plus extend in Rust, or an explicit loop elsewhere. The output size is `2n`
with values at most `1000`, comfortably inside every 32-bit bound.

**Complexity:** `O(n)` time, `O(n)` space for the output.
