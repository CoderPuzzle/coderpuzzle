# Solutions — Lexicographically Smallest String After Reverse II

## Hashed prefix races

One operation can only reverse a prefix or a suffix, so the reachable strings are exactly the `2n` implicit candidates `reverse(s[:k]) + s[k:]` and `s[:n-k] + reverse(s[n-k:])`. The winner necessarily starts with the smallest letter present in `s`: reversing the prefix that ends just after any occurrence of that letter carries it to the front. The race therefore only needs the candidates beginning with that letter — prefix reversals anchored at its occurrences, plus the suffix reversals when `s` itself already starts with it. Materializing every contender costs `O(n)` each with `O(n)` of them alive, so the comparisons must get cheaper rather than fewer.

Rolling hashes make one comparison logarithmic. Precompute prefix hashes of `s` and of its reverse — two base/modulus pairs, so accidental agreement is negligible — and observe that every candidate is a concatenation of at most two slices of those two known strings; the hash of any candidate prefix then assembles in `O(1)`. Two candidates race by binary-searching their longest common prefix (the largest length whose prefix hashes agree) and reading the next character straight out of the defining slices to break the tie. A single scan lets each surviving candidate challenge the reigning champion, and only that final winner is ever materialized, at the very end.

The degenerate shapes ride along for free: `k = 1` reproduces `s` and enters through the occurrence anchored at index `0`, a full reversal shows up in both families and merely ties with itself, and every step is iterative with the per-contender work capped at `O(log n)` hash evaluations.

**Complexity:** `O(n log n)` time, `O(n)` space.
