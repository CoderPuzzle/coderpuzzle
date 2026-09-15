# Solutions — Smallest Missing Non-negative Integer After Operations

An operation slides one element along its own arithmetic progression
`x, x ± value, x ± 2·value, …`, so an element can occupy any
non-negative number sharing its residue mod `value` — and nothing else.
The whole optimisation therefore collapses into residue bookkeeping:
which residue classes are populated and how densely.

## Residue-count greedy walk

Count how many elements carry each residue `r ∈ [0, value)`, then scan
target numbers upward from 0. Target `t` needs one element from class
`t mod value`; the greedy assignment is feasible exactly while that
class still has unused elements, so each step spends the class's next
copy. The scan stops at the first target whose class is exhausted —
that target cannot be produced, every smaller one can, and producing a
larger MEX would require it. The stop point is the maximum MEX.

Why greedy works: within one class, targets `< t` are cheap (any copy
serves), so spending copies on the smallest uncovered targets never
wastes capacity; a shortfall in any class is visible as soon as the
walk reaches its `count + 1`-th occurrence. Equivalently the answer
equals `min over residues r of r + count[r]·value` (classes with zero
elements answer immediately at their own residue). Remainders must be
normalised into `[0, value)` in languages where `%` keeps the dividend's
sign. The walk terminates after at most `nums.length + value` steps,
each `O(1)`.

**Complexity:** `O(n + value)` time, `O(value)` space.
