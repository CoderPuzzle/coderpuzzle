# Solutions — Minimum Moves to Equal Array Elements III

## Raise everything to the maximum

Moves can only raise an element, so no element ever ends below where it
started; a final common value v therefore has to be at least max(nums).
Landing on any such v costs exactly sum(v - nums[i]) — each element pays
its own deficit, one unit per move, independently of the others — and that
cost grows with v, so the cheapest reachable target is the maximum itself.
The minimum number of moves is simply the sum of the deficits to max(nums),
which is what the first hint points at.

The computation is two linear passes: one scan finds the maximum, a second
scan adds target - num for every element. Nothing needs sorting, counting,
or simulating — the deficits never interact because every move acts on one
element and pushes it toward the shared target.

The bounds keep the arithmetic tiny: at most 100 elements, each at most 99
units under the maximum, cap the answer at 99 * 99 = 9801, comfortably
inside 32-bit signed range, so plain fixed-width accumulators are exact.

**Complexity:** `O(n)` time, `O(1)` space.
