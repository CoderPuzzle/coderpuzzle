# Solutions — Minimum Increment to Make Array Unique

## Sort and sweep the final values

A move can only push a value up, never down, so each element's only real
question is how far up it must travel. Sorting makes every conflict local:
once the array is in ascending order, the cheapest legal target for an
element is the first value strictly above the final value of the element
before it — anything lower collides, and anything higher wastes moves that an
exchange argument rules out, because lowering such a target into the free gap
below it never breaks uniqueness.

The sweep keeps `prev`, the final value already granted to the previous
element. For each `nums[i]` the needed lift is `need = prev + 1 - nums[i]`;
when it is positive the element rises to `prev + 1`, those moves are spent,
and `prev` follows it up, otherwise the element already clears its
predecessor and `prev` simply becomes `nums[i]`. A block of `k` equal values
cascades into `0 + 1 + ... + (k - 1)` moves, each copy climbing one step over
the one beneath it — the all-equal case is exactly this quadratic, and the
worst of it lands on the constraint bound.

Example 2 sorts `[3,2,1,2,1,7]` into `[1,1,2,2,3,7]`, and the sweep hands out
finals `[1,2,3,4,5,7]` for `1+1+2+2+0 = 6` moves — the statement's
`[3,4,1,2,5,7]` up to order. That total can reach roughly `n²/2`, about
`5·10⁹` when all `10⁵` elements sit on `10⁵`, far past 32 bits, so the
accumulator is 64-bit wide; the frontier itself never passes `max(nums) + n`
and stays small.

**Complexity:** `O(n log n)` time, `O(1)` space.
