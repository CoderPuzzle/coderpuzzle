# Solutions — Maximum Product of Two Elements in an Array

## Track the two largest values

Every element is at least 1, so `nums[i] - 1` is never negative and the
product grows with both factors. The maximum therefore always comes from
the two largest elements: one pass tracking the largest and the
second-largest values (swapping when a new champion appears, and letting
ties fall through to second place) yields the two factors directly.

The answer is `(first - 1) * (second - 1)` — for `[1,5,4,5]` both
champions are 5, giving `4 * 4 = 16`. Values up to `10³` keep the product
under `10⁶`, far inside 32-bit range.

The brute-force double loop is equally valid at this size (`500²`
pairs), but the single pass states the structure: only the top two
matter.

**Complexity:** `O(n)` time, `O(1)` space.
