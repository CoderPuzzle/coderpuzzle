# Solutions — Find Score of an Array After Marking All Elements

## Sort once, sweep with marking

The pick order is fully determined by `(value, index)`, so a single sort of
the index list reproduces every choice the statement asks for: positions
already marked when their turn arrives are skipped, and the first surviving
candidate is exactly the smallest unmarked value with the smallest index.
Choosing it adds its value to the score and marks its immediate neighbors,
which is what lets all later sorted candidates skip the affected span in
`O(1)`.

Correctness follows because each simulation step of the statement consumes
the same minimal element this sweep does — marking only shrinks the
unmarked set, never reorders it — so induction on the number of picks makes
the two sequences coincide. The chosen positions are pairwise non-adjacent,
so at most `ceil(n / 2)` values, each at most 10⁶, enter the sum: under
5 × 10¹⁰. That exceeds 32 bits (hence the 64-bit return in every language)
but stays far below JavaScript's exact-Number bound 2⁵³.

**Complexity:** `O(n log n)` time for the sort, `O(n)` space.
