# Solutions — Destroy Sequential Targets

## Group targets by residue modulo space

Two targets can be destroyed by a single seed exactly when their values
differ by a multiple of `space`: if `seed` destroys `value`, then
`value - seed = c * space`, so both sit in the same residue class modulo
`space`. The machine seeded with the _smallest_ value of a residue class
reaches every member of that class (each later value is
`seed + c * space`), so the number of targets a class can contribute is
its full size, and that maximum is achieved by the class minimum.

One pass over `nums` therefore maintains, for each residue
`nums[i] % space`, a running count and the smallest value seen in the
class. The residue classes with the largest count tie for the maximum
destruction; among those, the answer is the smallest class minimum. All
arithmetic stays well inside 32 bits: residues are no larger than
`space <= 10⁹` and every candidate seed is one of the `nums` values.

**Complexity:** `O(n)` time, `O(n)` space.
