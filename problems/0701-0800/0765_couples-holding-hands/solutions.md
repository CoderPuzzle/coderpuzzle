# Solutions — Couples Holding Hands

Both solutions read the row the same way — only the slot a number occupies
matters, and the partner of `x` is `x ^ 1` — and both land on the total the
proof certifies: `n` minus the number of groups the partner pairs chain the
slots into. The sweep earns that total constructively: it walks the slots
once, dragging each missing partner home with one counted exchange per
freshly settled slot. The counter goes straight at the group structure
instead — union the two slots each pair straddles, count the components that
survive, and return `n` minus that count without ever performing an exchange.

## Greedy couch fixing with a position map

Group the seats into couches: seats `2i` and `2i+1` must end up holding exactly one couple. Since couples are `(0,1), (2,3), ...`, the partner of person `x` is `x ^ 1` (flip the low bit). Build `pos`, a map from each person to their current seat, so any partner can be located in constant time.

Walk the couches left to right. For couch `(i, i+1)`, look at `first = row[i]`; if `row[i+1]` is already `first ^ 1`, this couch is done. Otherwise find the seat `j` where the partner sits, swap the partner into seat `i+1` and move the displaced person to seat `j`, update `pos` for both, and count one swap. Each swap permanently fixes one couch and never disturbs an already-fixed couch to its left.

This is optimal: in the graph whose nodes are couches and whose edges join the two couches a couple occupies, a cycle of `L` couches needs exactly `L - 1` swaps, so the minimum is `n` minus the number of connected components. The greedy achieves that lower bound because every swap it makes completes one couple's couch and shrinks the unfinished part of some cycle by one. An already-seated row performs zero swaps.

**Complexity:** `O(n)` time, `O(n)` space for the position map.

## Union-Find Component Counting

The sweep's optimality proof already names the answer: give each slot a node
and each partner pair a link between the two slots its members occupy, and the
total is `n` minus the number of groups those links form. This variant
computes that count directly — it builds the group structure and never
simulates a swap.

An index table `pos` mapping each value to where it stands does the same duty
as in the sweep. Stepping `v` over the even values visits every partner pair
`(v, v ^ 1)` exactly once, and each pair unions the slot holding `v` with the
slot holding `v ^ 1`; a pair already sharing a slot unions a node with itself
and changes nothing. The union-find carries path compression and union by
size, so each link costs nearly constant time, and a counter that starts at
`n` and drops by one per merging union finishes at the number of groups.
Returning `n` minus that count is the whole computation.

The shape of the groups explains the arithmetic. Every slot holds two numbers,
so every node has degree two, and the links close into disjoint cycles: a
settled slot is a cycle of length one, a straddling pair an ordinary edge.
Settling a slot of a cycle splices its two links into one and leaves a cycle
shorter by one, so `L - 1` exchanges clear a group of `L` slots — and fewer
cannot, by the settled-region argument the sweep section makes. Summing
`L - 1` over the groups leaves `n` minus the group count, exactly what the
counter returns. On `[3,1,4,0,2,5]` all three slots sit on one cycle and it
returns two; on `[5,4,1,0,3,2]` every slot is its own cycle and it returns
zero.

**Complexity:** `O(n α(n))` time, `O(n)` space.
