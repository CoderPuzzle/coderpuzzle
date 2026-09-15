# Solutions — Minimum Number of Operations to Make All Array Elements Equal to 1

## GCD Subarray Search

Two regimes split the work. If the array already contains any 1, every
other element is one operation away from done — replace the neighbor of
a 1 with `gcd(x, 1) = 1` — and no operation can eliminate two elements
at once, so the answer is exactly the number of non-one elements. If
there is no 1 anywhere, the first 1 must be manufactured: an operation
replaces a single cell with the gcd of an adjacent pair, so after m
operations at most m + 1 original elements have been merged into that
cell's value. Producing the first 1 therefore needs at least L - 1
operations, where L is the length of the shortest contiguous window whose
overall gcd is 1, and folding any such window left to right achieves it.

Once the first 1 exists, each of the remaining n - 1 elements costs one
operation, giving the total `(L - 1) + (n - 1)`; spreading a manufactured
1 can never beat this because it still pays the full fold cost first.
The code finds L directly: for every start index it extends a running gcd
to the right and stops at the first position where it drops to 1 (the gcd
is monotonically non-increasing as elements join, so the earliest hit is
the shortest completion for that start). If no start ever reaches 1 the
whole array shares a common divisor d > 1 — every value ever produced is
then a multiple of d — so making all elements equal to 1 is impossible
and the method returns -1.

Widening: values fit in `int32` (`<= 10⁶`) and answers are below `2n`,
well under any overflow bound in all seven languages; JavaScript doubles
hold everything exactly since no intermediate approaches 2⁵³.

**Complexity:** `O(n · log V)` time for n <= 50 starts whose running gcds
cost a logarithmic Euclid step each, `O(1)` extra space.
