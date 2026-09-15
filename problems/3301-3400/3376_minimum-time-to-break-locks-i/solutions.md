# Solutions — Minimum Time to Break Locks I

The sword's state between locks is trivial: after breaking `j` locks the
energy has just reset to 0 and the factor is fixed at `1 + j*k`. So the
only real choice is the order in which the locks are broken, and the cost
of a lock depends solely on its position in that order.

## Bitmask dynamic programming over lock subsets

Locking a lock into slot `j` (0-based) costs `ceil(strength[i] / (1 + j*k))`
minutes: the sword banks `1 + j*k` energy every minute, so reaching
`strength[i]` takes exactly that many. A brute force walks all `n!` orders,
but the total depends only on which locks have been broken — their identity,
not the path taken — which is the signature of a subset DP. Let
`best[mask]` be the minimum minutes to break exactly the locks in `mask`;
then every lock `i` outside `mask` extends it at cost
`ceil(strength[i] / (1 + popcount(mask) * k))`, and the answer is
`best[(1 << n) - 1]`. Processing masks in increasing numeric order
guarantees every `best[mask]` is finite before it is read, since a submask
of `mask` is always numerically smaller.

The DP table has `2^n ≤ 256` entries with `n ≤ 8` transitions each — a few
thousand moves, versus up to `40320` permutations for the brute force. The
totals stay small: even eight locks of `10⁶` with `k = 1` sum to under
`2.8·10⁶` minutes, comfortably inside 32-bit integers.

**Complexity:** `O(2^n · n)` time, `O(2^n)` space.
