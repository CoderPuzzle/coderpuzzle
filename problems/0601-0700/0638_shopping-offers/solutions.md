# Solutions — Shopping Offers

## Memoized DFS on the remaining needs

Prices and offers never change as the basket fills, so the only fact that
determines the cheapest completion is how many pieces of each item are still
missing: the remaining-needs vector is a complete state, and its value is
independent of the order the buying happened in. That is what makes the
over-supply trap in example 2 harmless — the `$9` bundle would leave the
basket with more of item A than `needs` allows, so it is simply never a legal
move, while example 1 mixes one offer with individual purchases because both
move kinds compete on every state.

Each state has exactly two kinds of move. Buy one unit of any item `i` with
`cur[i] > 0` at `price[i]`, or apply any offer whose counts fit component-wise
inside `cur`, paying the offer's last entry; taking the minimum of each
move's price plus the recursive cost of the smaller state yields the state's
value, with the all-zero state paying `0`. Since counts only ever shrink, an
offer that over-grants some item relative to the initial `needs` can never
become usable later, and a dominated offer — one costing at least the unit
sum of its contents — loses its `min` race everywhere, so neither needs
special handling.

Why the memo fits: every move strictly decreases some component, so the
recursion runs over a lattice of at most `prod(needs[i] + 1)` states (at most
`11^6` under the constraints), and different move orders constantly reconverge
on the same basket — that sharing is exactly what the table collapses. Counts
never exceed 10, so the vector packs into a single base-11 integer that
indexes a flat memo; Python keeps it simpler with the needs tuple as a dict
key.

**Complexity:** `O(prod(needs[i] + 1) * (n + m))` time in the worst case, with
`m` offers, and `O(prod(needs[i] + 1))` space for the memo.
