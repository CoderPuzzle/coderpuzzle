# Solutions — Guess the Number Using Bitwise Questions I

## One probe per bit

The API reports how many bits its argument shares with the hidden `n` —
the popcount of `n & num`. That count collapses to a clean yes/no the
moment the argument carries a single set bit: `commonSetBits(2ⁱ)` can
overlap `n` in at most that one position, so a positive reply means bit
`i` of `n` is set and a zero reply means it is clear. Thirty masks pin
down all thirty bits, and the constraints leave nothing outside them to
recover — interrogation alone reconstructs `n`.

Rebuild the number directly: for each `i` from `0` through `29`, ask
`commonSetBits(2ⁱ)` and fold `2ⁱ` into the answer whenever the reply is
greater than zero. The queries are read-only, so the order of the probes
is irrelevant; there is also no early exit to take, since an unasked bit
is simply unknown. Whatever `n` is, the loop spends exactly 30 calls.

**Complexity:** `O(30)` calls to `commonSetBits`, `O(1)` space.
