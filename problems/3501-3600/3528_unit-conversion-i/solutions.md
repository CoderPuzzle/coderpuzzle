# Solutions — Unit Conversion I

## BFS from the root unit, multiplying factors

The guarantee that unit 0 reaches every unit through a unique combination
that never walks a conversion backwards means the edges form a directed
tree rooted at 0: each unit has exactly one incoming edge, from its parent.
A child unit then costs `factor` of itself per unit of its parent, so its
answer is simply the parent's answer multiplied by the edge factor — the
whole result array follows from one traversal outward from unit 0, whose
value is 1 by definition.

The answers are taken modulo `10⁹ + 7` as they are produced, which keeps
every intermediate product at `(10⁹ + 6) · 10⁹ ≈ 10¹⁸` — inside the signed
64-bit range for Java, C++, Go, and Rust. JavaScript and TypeScript Numbers
are exact only below `2⁵³ ≈ 9 · 10¹⁵`, so their multiplication runs in
`BigInt` and drops back to a `Number` after the reduction. The traversal is
an explicit queue rather than recursion, since a chain of `10⁵` units
would overflow any language's default call stack.

**Complexity:** `O(n)` time, `O(n)` space.
