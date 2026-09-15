# Check If N and Its Double Exist

## Approach: One pass with a seen-set

A pair (i, j) with `arr[i] == 2 * arr[j]` exists exactly when some element
meets its own double or half among the OTHER elements. Scanning left to
right with a set of already-seen values tests both directions at once:
before inserting `v`, look for `2 * v` (v would be the half) and for
`v / 2` when `v` is even (v would be the double).

Inserting only after the lookup keeps `i != j` honest — an element never
matches itself — which is precisely why a lone 0 is not a pair while two
zeros are (each is the double of the other).

**Complexity:** O(n) time, O(n) space.
