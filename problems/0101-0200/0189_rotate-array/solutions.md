# Solutions — Rotate Array

Both approaches rewrite the array in place — no scratch array, no second
allocation — and both start by normalizing, because a roll by the array's own
length is the identity and any larger `k` wraps to `k % n`. Three reversals
reads the rotation as block surgery: one full reversal trades the last `k`
elements for the first `n - k`, and two local reversals repair the order each
trade scrambled. Cyclic replacement follows each element's own stride
instead: position `i` feeds position `(i + k) % n`, chaining the array into
`gcd(n, k)` independent cycles, and walking every cycle drops each element
straight into its final slot, one value in flight at a time.

## Three reversals

A right rotation by `k` cuts the array into two blocks — the last `k` elements and the first `n - k` — and trades their order. Reversing the whole array performs exactly that trade, but flips each block's internal order as a side effect; reversing each block a second time restores that order without moving the blocks back. The normalization `k %= n` comes first, because a rotation by `n` steps is the identity and any larger `k` wraps around to `k % n`.

Each of the three passes is a swap-only two-pointer walk, so the rotation rewrites the given array with no second allocation — the `O(1)` extra space the follow-up asks for. Degenerate inputs fall out naturally: `k = 0` or any multiple of `n` reverses the full range twice and lands back on the identity, a one-element array is untouched, and values are merely permuted, so boundary values like `-2³¹` need no special handling.

Once the passes finish the method returns the same array it received — now rotated — which is what the judge compares.

**Complexity:** `O(n)` time, `O(1)` space.

## Cyclic replacement

One step of the roll sends position `i` to `(i + k) % n`, and that mapping partitions the `n` positions into `gcd(n, k)` cycles of equal length. Each cycle can be rewritten on its own with a single value in hand: pick up the element at the cycle's entry position, drop it into the slot it belongs to, catch the element that slot was holding, and repeat — after `n / gcd(n, k)` such moves the walk arrives back at its starting position, whose rightful element then closes the cycle.

Starting a walk from each of the first `gcd(n, k)` positions visits every position exactly once, so the `n` moves rewrite the whole array. The only storage is the one carried value (and the loop indices) — the `O(1)` extra space the follow-up asks for, with no reversal pass to run. Degenerate inputs collapse on their own: a normalized `k` of zero makes `gcd(n, k) = n`, so every cycle is a single fixed position and the walk touches each slot once without changing it, and a one-element array is its own fixed point.

Once every cycle closes, the method returns the same array it received — now rotated — which is what the judge compares.

**Complexity:** `O(n)` time, `O(1)` space.
