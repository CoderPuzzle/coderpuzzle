# Solutions — Broken Calculator

Searching forward branches at every value — both doubling and subtracting look
plausible, and the wrong choice stays invisible for a long time (from `5` to
`8`, doubling first spends four operations where subtracting first spends
two). Reversing the two operations removes the branching: undoing a doubling
is a halving, legal only on an even number, and undoing a subtraction is an
addition. Walked backwards from `target`, the problem becomes a near-forced
march whose step count is the answer.

## Work backwards from target

Keep `target` as the working value. While it sits strictly above `startValue`,
an odd value must add `1` — halving is illegal on odd numbers, and the walk
must halve eventually because only halving descends, so `+1` is the single way
back to even. An even value halves at once. Each reverse step is one counted
operation; when the value finally drops to `startValue` or below, the walk
stops and the remaining gap `startValue - target` is charged as that many
forward subtractions.

Two facts make this walk optimal. First, once the value is at or below
`startValue`, halving can never pay: if `a` additions remain in some plan, the
final value is at most (current value) `+ a` because halving only lowers, so
at least `startValue - value` additions are needed — and pure additions
attain exactly that cost, so no plan with an extra halving does better.
Second, above `startValue` the two moves are forced: an odd value can
only add, and from an even value `t`, adding `k >= 2` times before the next
halve lands on `t/2 + k/2` after `k + 1` operations, while halving first and
adding `k/2` times lands on the same value after `1 + k/2` operations —
strictly cheaper. So every optimal plan halves at even values above
`startValue`, adds the one forced `1` at odd ones, and finishes with plain
additions below it, which is precisely the walk above.

The loop halves at most `log2(target)` times, each halving preceded by at most
one addition, so even at the `10⁹` bound it runs about sixty iterations — the
maximal case `startValue = 10⁹, target = 1` never enters the loop and answers
`999999999` directly as a count. Values stay at or below `10⁹ + 1` and counts
below `10⁹ + 60`; the fixed-width implementations carry both in 64-bit
integers for headroom.

**Complexity:** `O(log target)` time, `O(1)` space.
