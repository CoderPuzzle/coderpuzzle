# Solutions — Maximum Total Damage With Spell Casting

## Aggregated Delete-and-Earn Dynamic Programming

The restriction ties a spell's fallout to its damage value, so every copy
of one value lives or dies together: casting any single damage-`x` spell
makes the remaining damage-`x` spells illegal anyway, while taking all of
them violates nothing extra. Collapsing each distinct damage into an
all-or-nothing group worth `count * x` shrinks the input to at most as
many groups as distinct values and reveals the structure — choose a
subset of group values, no two within distance 2, maximizing total gain.

Sorting those unique values turns the compatibility rule into a window:
the predecessors legal to combine with group `v` are exactly those with
value `<= v - 3`, a growing prefix as `v` increases. A forward take/skip
DP walks the sorted groups keeping `best[j]`, the optimum over the first
`j` groups; taking group `j` adds its whole-group gain to `best[left-1]`,
where a monotone left pointer has already settled at the first
incompatible position, and skipping simply carries `best[j - 1]`. Each
pointer step and each transition is constant amortized, so the pass runs
bottom-up with no recursion.

Bounded totals deserve care here: `10⁵` spells at damage `10⁹` sum to
`10¹⁴`, which overflows every signed 32-bit type but stays exact below
2⁵³ in JS/TS numbers and inside Java `long`, C++ `long long`, Go
`int64`, and Rust `i64`.

**Complexity:** `O(n log n)` time, `O(n)` space.
