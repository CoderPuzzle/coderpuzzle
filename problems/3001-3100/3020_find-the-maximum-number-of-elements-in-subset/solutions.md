# Solutions — Find the Maximum Number of Elements in Subset

## Hash-set counting with square climbs

Count how many times each value occurs. Every valid subset is one chain of powers of a single base x: two copies of each of x, x², x⁴, ..., and one copy of the top x^k, so its size is twice the number of paired levels plus one. Starting from each distinct base, greedily climb by squaring — take the pair at the current level whenever two copies exist and the square is present, otherwise stop and let the current level contribute the lone top element.

Base 1 is the one special case: since 1 squared is 1, every level of its chain holds the same value, so from c copies of 1 an odd number is selectable — all of them when c is odd, and c - 1 when c is even (one copy anchors nothing on its own beyond parity). The climb for bases above 1 cannot run long: squaring at most doubles the exponent's exponent, and values past 10⁹ are impossible under the constraints, so each chain tops out after a handful of levels (fewer than 10 elements). Squares are only ever formed while the base is at most 31622 — the largest integer whose square does not exceed 10⁹ — which keeps every product inside the input domain; fixed-width languages still hold it in a 64-bit intermediate before comparing.

The answer is the maximum over all base candidates: the trimmed run of 1s, the best climb for each value above 1, and the single-element fallback that every present value guarantees.

**Complexity:** `O(n)` time, `O(n)` space.
