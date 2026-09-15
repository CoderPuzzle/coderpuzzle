# Solutions — Find the Losers of the Circular Game

The game can never run long: there are only `n` friends, so by the pigeonhole
principle some friend receives the ball for the second time within `n` passes.
Direct simulation is therefore already asymptotically optimal — and since the
answer can list up to `n - 1` friends, reading every friend is unavoidable
anyway.

## Simulate the passes

Track a `received` flag per friend, starting with friend 1 already marked —
the statement counts that initial hand-out as receiving the ball. Walk the
holder around the circle with modular arithmetic: on turn `i` the ball moves
`i * k` seats clockwise, so in 0-indexed seats the new holder is
`(holder + i * k) mod n`. The moment the ball lands on a friend whose flag is
already set, the game ends — that friend has just received it for the second
time, and no further pass happens.

A final sweep over the flags in seat order collects every friend who was
never marked, which is exactly the ascending order the statement asks for, so
no sort is needed. All quantities stay tiny (`i * k <= 2500` under the
constraints), so plain machine integers are exact in every language.

**Complexity:** `O(n)` time, `O(n)` space.
