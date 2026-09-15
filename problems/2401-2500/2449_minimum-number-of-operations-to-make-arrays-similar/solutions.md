# Solutions — Minimum Number of Operations to Make Arrays Similar

## Parity classes, greedy sorted matching

Every operation changes one value by `+2` and another by `-2`, so no element
ever changes parity: the even values evolve entirely among themselves and the
odd values among themselves, and the two groups can be solved independently
(which is exactly what the hints suggest). Within one parity class an
operation moves 2 units of value from one element to another, so the number of
operations is fixed by how much value has to be lifted: the elements that must
rise pay for the total rise, and the elements that must fall contribute it.

Greedily matching the smallest element of `nums` in a class to the smallest
element of `target` in that class — then the next smallest, and so on — is
optimal: any crossing assignment can be uncrossed without raising the total
rise. The answer is therefore the sum of the positive differences of these
sorted pairings divided by 2, because each operation supplies exactly one `+2`
to a rising element and the falling elements ride along for free.

The code splits both arrays by parity, sorts each class, walks the paired
lists summing only the positive rises, and returns that total over 2. The sum
can reach `10^10` for the largest arrays, so the accumulator is 64-bit.

**Complexity:** `O(n log n)` time, `O(n)` space.
