# Solutions — Find Sum of Array Product of Magical Sequences

## Bit-window DP over indices

The sum `S = 2^seq[0] + 2^seq[1] + ... + 2^seq[m-1]` only ever receives
multiples of `2^i` once index `i` has been processed, so every bit below the
current index is already final. Process the indices of `nums` in increasing
order, carrying a state `(j, b, mask)`: `j` sequence slots filled so far, `b`
set bits of `S` already finalized (the count of set bits among positions
below the current index), and `mask = S >> i` — the carry window of
not-yet-settled higher bits that later terms can still disturb. Because a
sum of `j` powers of two is below `j·2^i`, the window never exceeds 30 and
fits in five bits.

Transitioning past index `i` means choosing how many copies `c` of it appear
in the sequence: `C(m−j, c)` ways to scatter those copies among the
remaining unfilled slots, times `nums[i]^c` of product weight. Adding
`c·2^i` to the sum makes bit `i` final — it equals `(mask + c) & 1`, so `b`
grows by that bit — and the next window is `(mask + c) >> 1`. The weights
`C(m−j, c)·nums[i]^c` are exactly the multinomial construction of distinct
sequences, so every magical sequence is counted once, with its own array
product. A useful pruning falls out of the same counting: the set-bit count
of a sum of `j + c` powers never exceeds `j + c`, so any state with
`b + popcount(mask)` beyond that can be dropped.

After the last index no disturbance is possible, and `mask` holds every
remaining high bit, so the total set-bit count is `b + popcount(mask)`.
Summing the states with `j = m` and total `k` gives the answer modulo
`10⁹ + 7`. Values stay below `10⁹ + 7` throughout, but the products
`nums[i]^c` are computed in 64-bit (raw powers reach `10^16`).

**Complexity:** `O(n · m³ · 2^w)` time, `O(m² · 2^w)` space, where
`w = ⌈log₂ m⌉ + 1 ≤ 5` is the carry-window width.
