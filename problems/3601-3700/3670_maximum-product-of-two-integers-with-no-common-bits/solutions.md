# Solutions — Maximum Product of Two Integers With No Common Bits

## Subset-max sweep over bitmasks

Values are at most 10⁶, so every number doubles as its own bitmask inside
20 bits, and "no common set bits" is exactly `nums[i] & nums[j] == 0` —
the partner's mask must sit entirely inside the complement of the other's.
That complement view turns pairing into a subset lookup. Build a table
`dp` over all 2²⁰ masks seeded with `dp[mask]` = the largest array value
whose set bits are exactly that mask (0 when no element carries it), then
run the classic subset-max sweep: for each bit `b`, every mask holding
`b` absorbs its `b`-cleared twin. When the sweep ends, `dp[m]` answers
"largest value whose set bits are a subset of `m`".

The answer falls out in one more pass: a disjoint partner of `x` carries a
mask that is a subset of `FULL ^ mx` with `FULL = 2²⁰ - 1`, so its best
choice is precisely `dp[FULL ^ mx]`, and the scan tracks the largest
`x * dp[FULL ^ mx]`. The table can never recommend `x` against itself —
a nonempty mask is never a subset of its own complement — so distinct
indices are guaranteed, and a value with no disjoint partner looks up 0,
which is why an empty result space naturally returns 0 without special
casing. The sweep and the final scan dominate: about `B · 2^B` relaxations
plus one linear walk, with `B = 20` fixed by the constraint ceiling.

The products reach `10⁶ · 10⁶ = 10¹²`, which overflows 32-bit integers,
so the fixed-width languages carry the answer through 64-bit accumulators
(`long long`, `long`, `int64`, `i64`) and declare it the return type; it
still sits far below JavaScript's exact-integer bound of 2⁵³, so plain
numbers multiply exactly there, and Python integers are unbounded.

**Complexity:** `O(2^B · B + n)` time, `O(2^B)` space.
