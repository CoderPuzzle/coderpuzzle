# Solutions — Assign Elements to Groups with Constraints

Both arrays are indexed, but only one ordering matters: a group takes the
**smallest element index** that divides it. Since every value is at most 10⁵,
the answer for every possible group size can be precomputed once with a
sieve, turning per-group divisor searches into three linear passes.

## Sieve from the smallest element index

Walk `elements` in index order and let the first occurrence of each value
claim every multiple it divides: `best[m]` records the marking element's
index, and the `best[m] == -1` guard means the earliest index to reach a
multiple is the one that stays. Ascending index order is what makes the
guard implement the priority rule — a later element can never overwrite an
earlier claimant. A repeated value is skipped after its first occurrence
because it divides exactly the same multiples with a strictly larger index,
so it can never win.

Once the table is filled, `assigned[i]` is simply `best[groups[i]]`, with
the untouched `-1` entries doubling as the "no suitable element" answer.
Sizes no element reached — 1 when no element equals 1, large primes with no
matching factor — keep their initial sentinel.

The marking work is the harmonic sum `Σ V/v` over the distinct element
values `v`, bounded by `V·(1 + 1/2 + … ) ≈ V ln V ≈ 1.2×10⁶` marks for the
value bound `V = 10⁵` — cheap next to the `E`- and `G`-sized passes around
it, and independent of how many groups share a size.

**Complexity:** `O(E + G + V log V)` time (`V = 10⁵` value bound),
`O(V)` space.
