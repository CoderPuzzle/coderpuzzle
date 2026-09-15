# Solutions — Number of Steps to Reduce a Number in Binary Representation to One

## Bit-by-bit scan with a carry

The string can be 500 bits long, far beyond any fixed-width integer, so
the number is never materialized. Instead the binary representation is
consumed from the least significant bit upward, one divide-by-two at a
time — dividing by two is exactly dropping the current rightmost bit. The
`add 1` operation never happens more than once per bit position either:
adding one flips a trailing run of `1`s to `0`s and injects a single
carry into the next position, so the whole process is captured by walking
the bits while remembering whether a carry is pending.

Process `s` from right to left, stopping before the leading `1`. At each
position combine the bit with the pending `carry` into a `digit` that is
0, 1, or 2. An even `digit` means the current number is even, so one step
divides by two and the next carry is `digit / 2` (the `1` that overflows
when `digit` is 2). An odd `digit` means the number is odd: one step adds
one — which makes the bit even and pushes a carry onward — and a second
step divides by two, for two steps and a carry of one. After the loop
only the leading `1` remains; if a carry is still pending the number is
binary `10`, which takes one final divide-by-two step, so the carry is
added to the count.

**Complexity:** `O(n)` time, `O(1)` extra space, where `n` is the length
of the string `s`.
