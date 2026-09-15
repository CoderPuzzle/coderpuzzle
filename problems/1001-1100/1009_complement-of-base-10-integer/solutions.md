# Solutions — Complement of Base 10 Integer

## All-ones window mask

The flip is confined to the window `n` occupies: the complement flips bits
within `n`'s own binary representation, so the bits above the leading 1
are not part of it and must stay untouched. XOR-ing `n` with a run of ones
exactly as wide as that window flips every bit inside it and nothing
above it, which is the whole answer.

The mask is grown rather than computed. Start at `1` and, while it is
still narrower than `n`, replace it with `mask * 2 + 1`: doubling a run of
ones and adding one extends it by one bit, so the mask is always
`2^k - 1`, and the loop stops at the first such run that covers `n`.
`n ^ mask` is then the complement — for `n = 5` the mask climbs to `111`
and `101 ^ 111 = 2`.

Starting the window at a single bit handles `n = 0` for free: the loop
body never runs (`1` is not narrower than `0`), so `mask` stays `1` and
`0 ^ 1 = 1` — the corner case the hint calls out. At the top of the range
(`n` just under `10^9`) the mask only needs to reach `2^30 - 1`,
comfortably inside a 32-bit int in every language, so no wider type is
needed.

**Complexity:** `O(log n)` time, `O(1)` space.
