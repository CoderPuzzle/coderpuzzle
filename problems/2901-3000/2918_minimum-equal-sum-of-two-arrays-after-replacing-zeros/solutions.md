# Solutions — Minimum Equal Sum of Two Arrays After Replacing Zeros

## Greedy floors on the two sums

Each zero can become any strictly positive integer, so an array containing
`z` zeros can realize any sum from `sum + z` (fill every zero with `1`, the
cheapest legal choice) upward — one zero absorbs all the extra slack. An
array with no zeros has no freedom at all: its sum is frozen. The reachable
sums of each array are therefore an interval `[sum + z, ∞)` when `z > 0`,
and the single point `{sum}` when `z = 0`.

The minimum equal sum is the smallest number in the intersection of the two
intervals. When both arrays have zeros that is simply the higher of the two
floors, `max(sum1 + z1, sum2 + z2)` — both can climb to it. When one array
is frozen, the other must climb exactly to that frozen sum, which is
possible only if the frozen sum is at least the climber's floor; otherwise
the answer is `-1`. Two frozen arrays match only on identical sums. Every
branch is decided by the two sums and two zero counts in one linear scan.

Element sums reach `10^5 × 10^6 = 10^11`, far past 32 bits, so the
accumulators and the answer stay in 64-bit integers (`long long`, `long`,
`int64`, `i64`); JavaScript and TypeScript stay exact because `10^11` is
far below `2^53`.

**Complexity:** `O(n + m)` time, `O(1)` space.
