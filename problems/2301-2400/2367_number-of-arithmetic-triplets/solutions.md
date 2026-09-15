# Solutions — Number of Arithmetic Triplets

## Count middles whose endpoints both exist

Because `nums` is strictly increasing, every value appears exactly once,
and a triplet is completely determined by its middle element: given
`nums[j]`, the required partners are exactly the values
`nums[j] - diff` and `nums[j] + diff`, and each exists at one unique index
whose position relative to `j` is forced by the ordering. So counting
triplets reduces to asking, for each element, whether both endpoint values
are present — an order-free membership question.

Putting the array into a hash set answers that in constant time per query.
One pass over `nums` then counts, for every candidate middle, both lookups;
the total is the number of triplets. This beats the brute-force triple loop
the small constraints would otherwise allow (`O(n³) ≈ 8 × 10⁶` at the
limits) with an `O(n)` sweep.

**Complexity:** `O(n)` time, `O(n)` space.
