# Solutions — Nested List Weight Sum

## Depth-first walk with a depth multiplier

Walk the structure depth-first, carrying the current depth: an integer hold
contributes `value * depth`, and a list hold recurses into each child at
`depth + 1`. The top level counts as depth 1, so every integer's weight is
exactly the number of lists enclosing it. Empty list holds contribute
nothing and need no special case — the loop over their (empty) children
simply sums to zero.

The recursion tracks only a depth counter and an accumulator, and the
constraint caps depth at 50, so no stack concerns arise in any language.

**Complexity:** `O(N)` time for `N` total elements (integers and lists),
`O(D)` space for the recursion stack, `D <= 50`.
