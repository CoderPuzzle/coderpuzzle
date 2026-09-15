# Solutions — Sum of Consecutive Subarrays

## Run-Ending Sum Scan

Every consecutive subarray lies inside a maximal run whose steps are all
`+1` or all `-1`, so the array decomposes into runs that we can scan once.
Carry `chain`, the length of the constant-direction run ending at the
current index, and `ending`, the sum of the values of **all** consecutive
subarrays that end at the current index. Adding every position's `ending`
into a running total counts each consecutive subarray exactly once —
grouped by where it ends — which is the contribution technique that makes
a single pass sufficient.

The recurrence lives in the transition. When the new step repeats the
current direction, the run grows by one: each subarray previously counted
in `ending` extends across the new element `x`, contributing its sum plus
`x`, and the fresh singleton `[x]` joins — together that is
`ending += chain * x`, taken after incrementing `chain`. When the step
flips to the opposite unit direction, no earlier ending survives the
extension (any longer span would mix the two directions), so the entire
sum is discarded and rebuilt from what is genuinely consecutive there:
the pair `[prev, x]` plus the singleton `[x]`, i.e. `ending =
nums[i - 1] + 2 * nums[i]`. That pair straddling the flip boundary is easy
to miss, yet it is consecutive — a length-2 span checks only one step.
Any other step (`0` or magnitude above 1) breaks everything, leaving only
`[x]`; the stored direction must be cleared here so two equal non-unit
steps in a row are never mistaken for a continuing run. Each step's
`ending` is added to the total, reduced modulo `10⁹ + 7`.

Both running sums are reduced every iteration, so they stay below the
modulus and the widest intermediate is `chain * x <= 10⁵ * 10⁵ = 10¹⁰`,
comfortably inside 64-bit range (and far below `2⁵³`, so JavaScript
`Number`s stay exact).

**Complexity:** `O(n)` time, `O(1)` space.
