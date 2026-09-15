# Solutions — Check If a String Can Break Another String

## Sort both and compare rank by rank

Which permutation to try needs no search. If any permutation of `x` can
break any permutation of `y`, then sorting both strings alphabetically
and comparing position by position is the strongest pairing on both
sides: the sorted order of `x` is the coordinate-wise weakest arrangement
`x` can offer, and the sorted order of `y` is the coordinate-wise
strongest, so the sorted-vs-sorted comparison succeeds exactly when some
pair of permutations succeeds. Sorting therefore loses nothing and turns
an exponential search into one linear check.

The remaining work is symmetric: compute `sorted(s1)` and `sorted(s2)`,
test whether the first dominates the second element-wise, test the
reverse, and answer the disjunction. Sorting costs `O(n log n)` (a
26-bucket counting sort would make it `O(n)`, an easy refinement given
the lowercase alphabet); both dominance scans are `O(n)`.

On `"abc"` versus `"xya"` the sorted pair is `abc` vs `axy`, and `axy >=
abc` position by position, so the answer is true.

**Complexity:** `O(n log n)` time with comparison sorting (or `O(n)` with
counting sort), `O(n)` space for the sorted copies.
