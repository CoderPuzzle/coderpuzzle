# Solutions — Number of Ways to Reorder Array to Get Same BST

## Recursive split with binomial interleaving

The first element of `nums` is always the BST's root, since every later
value gets compared against it during insertion. Splitting the
remaining elements into those smaller than the root and those larger
than the root produces exactly the two sub-sequences that land in the
left and right subtrees. For a reordered array to build the identical
tree, its own split at the same root must contain the same two value
sets, and — this is the part that limits the count — each sub-sequence
must keep its _own_ original relative order, since permuting the
relative order within one side changes that side's shape even though
the root stays the same.

If the left sub-sequence has `L` elements and the right has `R`, the
number of ways to weave two order-preserving sub-sequences into one
combined sequence of length `L + R` is the binomial coefficient
`C(L + R, L)`: choosing which `L` of the `L + R` slots go to the left
run fixes every element's position. So `ways(nums)` is `C(L + R, L)`
times `ways(left)` times `ways(right)`, recursing on each side until a
sub-sequence has `0` or `1` elements, where `ways` is `1`. The problem's
answer is `ways(nums) - 1`, since the original array is one of the
counted reorderings and must be excluded.

Since `n` can reach `1000`, computing `C(L + R, L)` on demand needs
factorials `0..n` and their modular inverses precomputed once — via
Fermat's little theorem, since `10^9 + 7` is prime, `inv(k!)` is
`(k!)^(MOD-2) mod MOD` — after which every combination query is `O(1)`.
The recursion itself partitions each array position exactly once per
level, so the total work is `O(n^2)` in the worst case (a fully
unbalanced original BST, i.e. an already-sorted `nums`).

**Complexity:** `O(n^2)` time, `O(n)` space.
